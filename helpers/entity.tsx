import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

class Entity {
  get() {
    const { data, error } = useSWR('/api/entity', fetcher);
    return { data, error };
  }
}

export default Entity