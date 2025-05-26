import axios from "axios";
import type { TarefaData } from "../interface/tarefaData";
import { useQuery } from "@tanstack/react-query";

const API_URL_BASE = "http://localhost:3000/api/tarefas";


export type StatusFiltro = TarefaData['status'] | 'TODOS';

const fetchData = async (filtroStatus: StatusFiltro): Promise<TarefaData[]> => {
    let url = API_URL_BASE;
    if (filtroStatus && filtroStatus !== 'TODOS') {
        url = `${API_URL_BASE}/status?status=${filtroStatus}`;
    }
    const response = await axios.get<TarefaData[]>(url);
    return response.data;
};

export function useTarefaData(filtroStatus: StatusFiltro = 'TODOS') {
    const query = useQuery<TarefaData[], Error>({
        queryKey: ["tarefas", filtroStatus],
        queryFn: () => fetchData(filtroStatus),
        retry: 2,
    });
    return query;
}