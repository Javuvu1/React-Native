import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

interface Empleado {
  id_empleado: number;
  nombre: string;
  email: string;
  salario: number;
  fecha_contratacion: string;
  id_departamento: number;
}

export function ListadoScreen() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    async function fetchEmpleados() {
      try {
        const response = await fetch('http://localhost:3000/api/empleado', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setEmpleados(data.datos);
        } else {
          console.error('Error al obtener los empleados');
        }
      } catch (error) {
        console.error('Error en fetchEmpleados:', error);
      }
    }

    fetchEmpleados();
  }, []);

  const handleDelete = async (idEmpleado) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este empleado?");
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:3000/api/empleado/${idEmpleado}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar empleado");
      }

      setEmpleados((rows) => rows.filter((empleado) => empleado.id_empleado !== idEmpleado));
    } catch (error) {
      console.error("Error eliminando empleado:", error);
    }
  };

  const renderEmpleado = ({ item }: { item: Empleado }) => {
    const fechaFormateada = new Date(
      item.fecha_contratacion
    ).toLocaleDateString();

    return (
      <Card style={styles.card}>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.idText}>ID: {item.id_empleado}</Text>
            <Heading size="md" style={styles.nombre}>
              {item.nombre}
            </Heading>
            <Text style={styles.detailText}>Correo: {item.email}</Text>
            <Text style={styles.detailText}>
              Salario: ${item.salario.toLocaleString()}
            </Text>
            <Text style={styles.detailText}>
              Fecha de contratación: {fechaFormateada}
            </Text>
            <Text style={styles.detailText}>
              Departamento: {item.id_departamento}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Borrar"
              onPress={() => handleDelete(item.id_empleado)}
              color="#e53e3e"
            />
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={empleados}
        keyExtractor={(item) => item.id_empleado.toString()}
        renderItem={renderEmpleado}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    minWidth: 350,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#2d3748',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  idText: {
    fontSize: 12,
    color: '#cbd5e0',
    marginBottom: 2,
  },
  nombre: {
    marginBottom: 8,
    color: '#edf2f7',
  },
  detailText: {
    fontSize: 12,
    color: '#e2e8f0',
    marginBottom: 2,
  },
  buttonContainer: {
    justifyContent: 'center',
  },
});
