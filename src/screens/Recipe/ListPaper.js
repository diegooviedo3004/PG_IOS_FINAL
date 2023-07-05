import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

const DataTablePaper = ({data}) => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
    );
  
    const [items] = React.useState([
     {
       key: 1,
       name: 'Cupcake',
       calories: 356,
       fat: 16,
     },
     {
       key: 2,
       name: 'Eclair',
       calories: 262,
       fat: 16,
     },
     {
       key: 3,
       name: 'Frozen yogurt',
       calories: 159,
       fat: 6,
     },
     {
       key: 4,
       name: 'Gingerbread',
       calories: 305,
       fat: 3.7,
     },
    ]);
  
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

  console.log(data)

  if(data.length < 1) {
    return (
        <>
          <Text style={{textAlign: "center", marginVertical:10}}>Citas pendientes</Text>

         <Text style={{marginVertical: 10, }}>
                {'\n'}
                {'\n'}
                No tienes citas pendientes
            </Text>
        </>
    )
  }

  return (
    <DataTable>
    <DataTable.Header>
      <DataTable.Title>Motivo</DataTable.Title>
      <DataTable.Title numeric>Fecha</DataTable.Title>
      <DataTable.Title numeric>Hora</DataTable.Title>
    </DataTable.Header>

    {data.map((item) => (
      <DataTable.Row key={item.id}>
        <DataTable.Cell>{item.motivo}</DataTable.Cell>
        <DataTable.Cell numeric>{item.fecha_cita}</DataTable.Cell>
        <DataTable.Cell numeric>{item.hora}</DataTable.Cell>
      </DataTable.Row>
    ))}


  </DataTable>
  );
};

  

export default DataTablePaper;