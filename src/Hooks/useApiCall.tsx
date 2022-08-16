import { useEffect, useState } from 'react';
import getArticles from '../resources/articles';


export function useGetData() {
    const [data, setData] = useState();
    useEffect(() => {
        const doFetch = async () => {
            try {
                // Simulate a api call
                const response:any = await new Promise(resolve => {
                    setTimeout(function () { resolve(getArticles()); }, 100);
                });
                // Example for api call using axios
                //const response = await axios.get('endpoint_apicall');
                setData(response);

            } catch(err) {
                //TODO: handler error
            }
        }
        doFetch()
    }, []);
  
    return { data };
  }