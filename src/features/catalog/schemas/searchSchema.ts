import { z } from "zod";

export const searchSchema = z.object({
    search: z.string().max(100).optional(),

    categoryId: z.string().uuid().optional(),

    page: z.number().min(1),

    pageSize: z.number().min(1).max(100),
});

export type SearchSchema = z.infer<typeof searchSchema>;