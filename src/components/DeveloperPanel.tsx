/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Terminal, Settings, Database, Wifi, WifiOff, CheckCircle, XCircle, Trash2, Cpu, BookOpen, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { ApiConfig, ApiLog } from '../types';
import { getApiConfig, saveApiConfig, addLogListener } from '../services/api';

interface DeveloperPanelProps {
  onConfigChange?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperPanel({ onConfigChange, isOpen, onClose }: DeveloperPanelProps) {
  const [config, setConfig] = useState<ApiConfig>({
    baseUrl: '',
    token: '',
    useMockFallback: true,
  });

  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'logs' | 'docs'>('config');
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Load configuration on mount
  useEffect(() => {
    setConfig(getApiConfig());
  }, [isOpen]);

  // Listen to API logs in real time
  useEffect(() => {
    const unsubscribe = addLogListener((newLog) => {
      setLogs((prev) => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
    });
    return unsubscribe;
  }, []);

  // Auto scroll logs
  useEffect(() => {
    if (logsEndRef.current && activeTab === 'logs') {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, activeTab]);

  const handleSave = (updated: Partial<ApiConfig>) => {
    const nextConfig = { ...config, ...updated };
    setConfig(nextConfig);
    saveApiConfig(nextConfig);
    if (onConfigChange) onConfigChange();
  };

  const handleTestConnection = async () => {
    if (!config.baseUrl) return;
    setIsTesting(true);
    setTestResult(null);

    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (config.token) {
        headers['Authorization'] = `Bearer ${config.token}`;
      }

      // Hit the products endpoint as a health-check
      const url = `${config.baseUrl.replace(/\/$/, '')}/products`;
      const response = await fetch(url, { method: 'GET', headers });
      
      if (response.ok) {
        setTestResult('success');
      } else {
        setTestResult('failed');
      }
    } catch {
      setTestResult('failed');
    } finally {
      setIsTesting(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setSelectedLog(null);
  };

  if (!isOpen) return null;

  return (
    <div id="developer-panel-root" className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-slate-950 border-l border-slate-900 shadow-2xl flex flex-col font-sans text-slate-100">
      {/* Header */}
      <div className="p-4 border-b border-slate-900 flex items-center justify-between bg-slate-950/90 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-extrabold uppercase tracking-wider font-mono text-indigo-400">
            .NET Backend Integrator
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-900"
          title="Close panel"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Connection Status Banner */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-900 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5">
          {config.useMockFallback ? (
            <>
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 font-bold font-mono text-[10px]">USING HIGH-FIDELITY MOCK DATABASE</span>
            </>
          ) : config.baseUrl ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-400 font-bold font-mono text-[10px]">CONNECTED TO CUSTOM API</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-500 font-bold font-mono text-[10px]">API BASE URL NOT SETUP</span>
            </>
          )}
        </div>
        {config.baseUrl && (
          <span className="text-slate-500 text-[10px] truncate max-w-[200px] font-mono font-bold">
            {config.baseUrl}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-900 bg-slate-950/40 text-xs">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-3 text-center border-b-2 font-bold transition-colors ${
            activeTab === 'config'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-3.5 h-3.5 inline mr-1.5" />
          API Setup
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex-1 py-3 text-center border-b-2 font-bold transition-colors relative ${
            activeTab === 'logs'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 inline mr-1.5" />
          Console Logs
          {logs.length > 0 && (
            <span className="absolute top-2.5 right-4 bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded-full text-[9px]">
              {logs.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex-1 py-3 text-center border-b-2 font-bold transition-colors ${
            activeTab === 'docs'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900/30'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
          Endpoints & DTOs
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'config' && (
          <div className="space-y-4 animate-fade-in">
            {/* Quick Helper */}
            <div className="p-3 bg-indigo-950/25 border border-indigo-900/40 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-indigo-300">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-indigo-200">Connect Your Local or Cloud .NET Backend</p>
                <p className="mt-1">
                  Connect your ASP.NET Core API demo to this responsive frontend by setting the base URL below. Enable CORS in your .NET startup config!
                </p>
              </div>
            </div>

            {/* Config Fields */}
            <div className="space-y-4 bg-slate-950/30 p-4 border border-slate-900/60 rounded-xl">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono block">DATABASE MODE</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => handleSave({ useMockFallback: true })}
                    className={`py-2 px-3 text-xs font-mono rounded-lg border flex items-center justify-center space-x-1.5 transition-all ${
                      config.useMockFallback
                        ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Mock DB Mode</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave({ useMockFallback: false })}
                    className={`py-2 px-3 text-xs font-mono rounded-lg border flex items-center justify-center space-x-1.5 transition-all ${
                      !config.useMockFallback
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Real API Mode</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="dotnet-api-url" className="text-xs text-slate-400 font-mono block">ASP.NET CORE API BASE URL</label>
                <input
                  id="dotnet-api-url"
                  type="url"
                  value={config.baseUrl}
                  onChange={(e) => handleSave({ baseUrl: e.target.value })}
                  placeholder="https://localhost:5001/api or https://my-app.azurewebsites.net/api"
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="dotnet-auth-token" className="text-xs text-slate-400 font-mono block">BEARER JWT TOKEN (OPTIONAL)</label>
                <textarea
                  id="dotnet-auth-token"
                  rows={2}
                  value={config.token}
                  onChange={(e) => handleSave({ token: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono resize-none"
                />
              </div>

              {/* Test Connection Button */}
              {config.baseUrl && !config.useMockFallback && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-850 text-white font-mono text-xs py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors border border-slate-800"
                  >
                    <Cpu className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-indigo-400' : ''}`} />
                    <span>{isTesting ? 'Pinging GET /products...' : 'Test API Connection'}</span>
                  </button>

                  {/* Test Connection Result */}
                  {testResult && (
                    <div className={`mt-3 p-2.5 rounded-lg border text-xs flex items-center space-x-2 animate-fade-in ${
                      testResult === 'success'
                        ? 'bg-indigo-950/35 border-indigo-900/60 text-indigo-300'
                        : 'bg-rose-950/35 border-rose-900/60 text-rose-300'
                    }`}>
                      {testResult === 'success' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>Connected successfully! GET /products returned status 200 OK.</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <div>
                            <span className="font-semibold block">Connection Failed.</span>
                            <span className="text-[11px] text-slate-400">Ensure your .NET API is running, endpoints exist, and CORS policy permits calls from this domain!</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CORS Policy Code Snippet */}
            <div className="space-y-2 bg-slate-950/50 p-4 border border-slate-900 rounded-xl text-xs">
              <div className="flex items-center space-x-1 text-indigo-400 font-mono">
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="font-semibold text-slate-300">How to allow CORS in Program.cs?</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Add this snippet to your backend <code className="bg-neutral-900 px-1 py-0.5 rounded text-white text-[11px] font-mono">Program.cs</code> to allow connection:
              </p>
              <pre className="p-2.5 bg-neutral-950 border border-neutral-850 rounded-lg overflow-x-auto text-[10px] font-mono text-neutral-300 leading-normal">
{`builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin() // or applet URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Place BEFORE app.UseAuthorization()
app.UseCors();`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-3 h-[450px] flex flex-col animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-400">Showing last 50 HTTP activities</span>
              <button
                onClick={clearLogs}
                className="text-[10px] text-neutral-500 hover:text-white flex items-center space-x-1 font-mono transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Terminal</span>
              </button>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 bg-neutral-950 rounded-xl border border-neutral-850 p-2 overflow-y-auto font-mono text-[11px] flex flex-col space-y-1.5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-neutral-600 space-y-2 py-8">
                  <Terminal className="w-8 h-8 text-neutral-700" />
                  <span>Terminal idle. Interact with storefront to log requests...</span>
                </div>
              ) : (
                logs.map((log) => {
                  const isErr = log.type === 'error';
                  const isReq = log.type === 'request';
                  const methodColor = 
                    log.method === 'GET' ? 'text-blue-400' :
                    log.method === 'POST' ? 'text-emerald-400' :
                    log.method === 'DELETE' ? 'text-rose-400' : 'text-amber-400';

                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                      className={`p-2 rounded-lg cursor-pointer transition-all border ${
                        selectedLog?.id === log.id
                          ? 'bg-neutral-900 border-neutral-700 text-white'
                          : isErr
                          ? 'bg-rose-950/10 border-rose-950/30 hover:bg-rose-950/20 text-rose-300'
                          : isReq
                          ? 'bg-neutral-900/40 border-transparent hover:bg-neutral-900/60 text-neutral-400'
                          : 'bg-emerald-950/5 border-transparent hover:bg-emerald-950/10 text-emerald-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <span className="text-[10px] text-neutral-500">{log.timestamp}</span>
                          <span className={`font-bold ${methodColor}`}>{log.method}</span>
                          <span className="text-neutral-300 select-all break-all">{log.endpoint.replace(config.baseUrl, '...')}</span>
                        </div>
                        <span className={`font-mono text-[10px] font-bold shrink-0 ${
                          isErr ? 'text-rose-400' : isReq ? 'text-neutral-500' : 'text-emerald-400'
                        }`}>
                          {log.status}
                        </span>
                      </div>

                      {/* Expanded Payload Visualizer */}
                      {selectedLog?.id === log.id && log.payload && (
                        <div className="mt-2.5 p-2 bg-neutral-950 border border-neutral-800 rounded-lg overflow-x-auto text-[10px] leading-relaxed text-neutral-300 select-text">
                          <div className="text-[9px] text-neutral-500 font-bold border-b border-neutral-900 pb-1 mb-1 uppercase">
                            JSON PAYLOAD / RESPONSE
                          </div>
                          <pre>{log.payload}</pre>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl space-y-1">
              <h3 className="font-bold text-neutral-200">REST Controller Mapping</h3>
              <p className="text-neutral-400 text-[11px] leading-normal">
                Implement these standard endpoints in your Web API / Minimal API controllers:
              </p>
            </div>

            {/* Endpoints checklist */}
            <div className="space-y-3">
              <div className="bg-neutral-950/30 border border-neutral-850 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5">
                  <span className="font-bold text-blue-400 font-mono">GET /api/products</span>
                  <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400 font-mono">List Catalog</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-normal">
                  Returns array of products. JSON structure should match:
                </p>
                <pre className="p-2 bg-neutral-950 text-neutral-300 text-[10px] rounded border border-neutral-900 overflow-x-auto font-mono">
{`[
  {
    "id": "prod_01",
    "name": "Product Title",
    "description": "Details...",
    "price": 299.00,
    "category": "Electronics",
    "image": "https://...",
    "rating": 4.8,
    "reviewsCount": 142,
    "stock": 12
  }
]`}
                </pre>
              </div>

              <div className="bg-neutral-950/30 border border-neutral-850 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-1.5">
                  <span className="font-bold text-indigo-400 font-mono">POST /api/orders</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">Submit Checkout</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-normal">
                  Fires on purchase. The payload contains:
                </p>
                <pre className="p-2 bg-neutral-950 text-neutral-300 text-[10px] rounded border border-neutral-900 overflow-x-auto font-mono">
{`{
  "items": [
    {
      "product": { "id": "prod_01", ... },
      "quantity": 2,
      "selectedSize": "M"
    }
  ],
  "subtotal": 598.00,
  "tax": 47.84,
  "shipping": 0.00,
  "total": 645.84,
  "shippingAddress": {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "address": "123 Dev Lane",
    "city": "Seattle",
    "zipCode": "98101",
    "country": "USA"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-900 bg-slate-950 text-center text-[10px] text-slate-500 flex items-center justify-between">
        <span>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono font-bold">Esc</kbd> to close</span>
        <span className="flex items-center text-indigo-400 font-bold font-mono">
          <Database className="w-3 h-3 mr-1" />
          DOCKER-READY FRONTEND
        </span>
      </div>
    </div>
  );
}
