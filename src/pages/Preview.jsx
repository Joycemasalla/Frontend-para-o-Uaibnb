import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 3rem auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Nome = styled.h2`
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 0.5rem;
`;

const Descricao = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const Caracteristicas = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: auto;
`;

const CaracteristicaItem = styled.li`
  font-size: 0.9rem;
  color: #0077cc;
  margin-bottom: 0.3rem;
`;

function Preview() {
  const [locacoes, setLocacoes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
          }
        );
        setLocacoes(response.data.records);
      } catch (error) {
        console.error('Erro ao buscar locações:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Title>Locações Disponíveis</Title>
      <Grid>
        {locacoes.map((locacao) => (
          <Card key={locacao.id}>
            <Image src={locacao.fields.imagem} alt={`Imagem de ${locacao.fields.nome}`} />
            <Nome>{locacao.fields.nome}</Nome>
            <Descricao>{locacao.fields.descricao}</Descricao>
            <Caracteristicas>
              {locacao.fields.caracteristicas?.map((carac, index) => (
                <CaracteristicaItem key={index}>{carac}</CaracteristicaItem>
              ))}
            </Caracteristicas>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Preview;
 