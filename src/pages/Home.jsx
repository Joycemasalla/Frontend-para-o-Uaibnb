import React, { useEffect, useState } from 'react';
import { getCaracteristicas, getHospedagens } from '../services/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 1rem;
`;

const CaracteristicasContainer = styled.div`
  margin-top: 1rem;
`;

const Caracteristica = styled.span`
  display: inline-block;
  background-color: #007bff1a;
  color: #007bff;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin: 0.3rem 0.4rem 0 0;
`;

const BotaoCadastro = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 2rem;
  margin-right: 1rem;

  &:hover {
    background-color: #005fa3;
  }
`;

const BotaoEditar = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start;
  margin-top: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

function Home() {
  const [hospedagens, setHospedagens] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHospedagens()
      .then(data => setHospedagens(data))
      .catch(error => console.error('Erro ao buscar hospedagens:', error));
  }, []);

  useEffect(() => {
    getCaracteristicas()
      .then(data => setCaracteristicas(data))
      .catch(error => console.error('Erro ao buscar características:', error));
  }, []);

  const irParaNovaHospedagem = () => {
    navigate('/nova');
  };

  
  return (
    <Container>
      <Title>Hospedagens Cadastradas</Title>
      <BotaoCadastro onClick={irParaNovaHospedagem}>
        Cadastrar Hospedagem
      </BotaoCadastro>
      <BotaoCadastro onClick={() => navigate('/caracteristicas')}>
        Cadastrar Característica
      </BotaoCadastro>

      <Grid>
        {hospedagens.map((item) => (
          <Card key={item.id}>
            <h2>{item.fields.titulo}</h2>
            <p><strong>Cidade:</strong> {item.fields.cidade}</p>
            <p><strong>Preço:</strong> R$ {item.fields.preco}</p>
            <p>{item.fields.descricao}</p>
            {item.fields.imagem && <Image src={item.fields.imagem} alt={item.fields.titulo} />}
            <BotaoEditar onClick={() => navigate(`/editar/${item.id}`)}>Editar</BotaoEditar>

            <CaracteristicasContainer>
              <strong>Características:</strong>
              {item.fields.nome_caracteristica?.length > 0 ? (
                <div>
                  {item.fields.nome_caracteristica.map((carac, index) => (
                    <Caracteristica key={index}>{carac}</Caracteristica>
                  ))}
                </div>
              ) : (
                <p>Nenhuma característica disponível</p>
              )}
            </CaracteristicasContainer>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
