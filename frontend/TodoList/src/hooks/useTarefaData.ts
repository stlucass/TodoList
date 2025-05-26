import axios from "axios";
import type { TarefaData } from "../interface/tarefaData";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:3000/api";

const fetchData = async (): Promise<TarefaData[]> => {
    const response = await axios.get<TarefaData[]>(API_URL + "/tarefas");
    return response.data;
};

export function useTarefaData() {
    const query = useQuery({
        queryKey: ["tarefas"],
        queryFn: fetchData,
        retry: 2,
    });

    return query;
}