import React from 'react';
import { useRouter } from 'next/router';
import MUList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SimplePlaceCard from '@client/components/simple-place-card/simple-place-card';
import styles from './styles.module.scss';

type ListProps = {
  list: any;
};

const List = ({ list }: ListProps) => {
  const router = useRouter();

  const handleChange = (id: string) => () => {
    router.push(`/places/${id}`);
  };

  return (
    <MUList className={styles.list} subheader={<li />}>
      {list.map((item: any) => (
        <ListItem key={`item-${item.id}`}>
          <SimplePlaceCard
            title={item.title}
            description={item.description}
            imageSrc={item.content[0]}
            onOpen={handleChange(item.id)}
            onDelete={handleChange(item.id)}
          />
        </ListItem>
      ))}
    </MUList>
  );
};

export default List;
