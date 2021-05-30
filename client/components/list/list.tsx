import React from 'react';
import MUList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SimplePlaceCard from '@client/components/simple-place-card/simple-place-card';
import styles from './styles.module.scss';

type ListProps = {
  list: any;
  onItemOpen: (id: string) => () => void;
  onItemDelete: (id: string) => () => void;
};

const List = ({ list, onItemOpen, onItemDelete }: ListProps) => {
  return (
    <MUList className={styles.list} subheader={<li />}>
      {list.map((item: any) => (
        <ListItem key={item.id}>
          <SimplePlaceCard
            title={item.title}
            description={item.description}
            imageSrc={item.content[0]}
            onOpen={onItemOpen(item.id)}
            onDelete={onItemDelete(item.id)}
          />
        </ListItem>
      ))}
    </MUList>
  );
};

export default List;
