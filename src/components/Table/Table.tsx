import type { TableProps } from "./Table.types";

export default function Table<T extends object>({
    columns,
    data,
}:TableProps<T>){

    return(

        <table>

            <thead>

                <tr>

                    {columns.map(c=>

                        <th key={String(c.accessor)}>
                            {c.header}
                        </th>

                    )}

                </tr>

            </thead>

            <tbody>

                {data.map((row,index)=>(

                    <tr key={index}>

                        {columns.map(c=>

                            <td key={String(c.accessor)}>
                                {String(row[c.accessor])}
                            </td>

                        )}

                    </tr>

                ))}

            </tbody>

        </table>

    );

}