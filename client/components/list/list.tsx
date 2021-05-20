import React from 'react';
import MUList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import PlaceCard from '@client/components/place-card/place-card';
import styles from './styles.module.scss';

type ListProps = {
  list: any;
};

const List = ({ list }: ListProps) => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (id: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  return (
    <MUList className={styles.list} subheader={<li />}>
      {list.map((item: any) => (
        <ListItem key={`item-${item.id}`}>
          <PlaceCard
            id={item.id}
            title={item.title}
            description={item.description}
            location={item.location}
            content={item.content}
            message={item.message}
            expanded={expanded === item.id}
            handleChange={handleChange(item.id)}
          />
        </ListItem>
      ))}
    </MUList>
  );
};

export default List;
