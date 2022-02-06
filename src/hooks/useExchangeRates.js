import { useQuery } from "@apollo/client";

export const useExchangeRates = (gql) =>{

    const { loading, error, data } = useQuery(gql)

    return {loading, error, data}
}