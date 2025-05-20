import React, { useEffect, useState } from 'react';
import { getHospedagens } from '../services/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiHome, FiSearch, FiX } from 'react-icons/fi';

/* ---------- styled‑components ---------- */

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const ActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 10px;
  padding: 0.45rem 0.8rem;
  max-width: 400px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  font-size: 1rem;
  padding: 0.35rem;
  outline: none;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 0.2rem;
  color: #666;
  cursor: pointer;

  &:hover { color: #222; }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  background: ${({ variant }) =>
    variant === 'green' ? '#28a745' : '#0077cc'};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background: ${({ variant }) =>
      variant === 'green' ? '#218838' : '#005fa3'};
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 2rem;
`;

const Card = styled.article`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1.5rem;

  h2 { font-size: 1.3rem; color: #34495e; margin-bottom: 0.6rem; }
  p  { font-size: 0.93rem; color: #555; margin-bottom: 0.4rem; }
`;

const Tags   = styled.div` margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem; `;
const Tag    = styled.span` background: #e0f0ff; color: #007bff; padding: 0.35rem 0.8rem; border-radius: 30px; font-size: 0.75rem; `;
const EditBtn = styled.button`
  align-self: flex-start;
  margin: 0 0 1.2rem 1.5rem;
  background: transparent;
  border: 2px solid #28a745;
  color: #28a745;
  display: flex; align-items: center; gap: 0.3rem;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover { background: #28a745; color: #fff; }
`;

/* -------------- Componente -------------- */

function Home() {
  const [hospedagens, setHospedagens] = useState([]);
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getHospedagens()
      .then((data) =>
        setHospedagens(
          data.sort((a, b) =>
            a.fields.titulo.localeCompare(b.fields.titulo, 'pt-BR')
          )
        )
      )
      .catch(console.error);
  }, []);

  const filtradas = busca
    ? hospedagens.filter((h) =>
        h.fields.titulo.toLowerCase().includes(busca.toLowerCase())
      )
    : hospedagens;

  return (
    <Container>
      <Title>
        <FiHome style={{ verticalAlign: 'middle', marginRight: 8 }} />
        Hospedagens Cadastradas
      </Title>

      <ActionBar>
        <SearchWrapper>
          <FiSearch size={18} color="#666" style={{ marginRight: 6 }} />
          <SearchInput
            placeholder="Buscar por título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          {busca && (
            <ClearButton onClick={() => setBusca('')}>
              <FiX size={18} />
            </ClearButton>
          )}
        </SearchWrapper>

        <ActionButton onClick={() => navigate('/nova')}>
          <FiPlus size={18} /> Nova Hospedagem
        </ActionButton>
      </ActionBar>

      <Grid>
        {filtradas.map(({ id, fields }) => (
          <Card key={id}>
            {fields.imagem && <Banner src={fields.imagem} alt={fields.titulo} />}
            <CardBody>
              <h2>{fields.titulo}</h2>
              <p><strong>Cidade:</strong> {fields.cidade}</p>
              <p><strong>Preço:</strong> R$ {fields.preco}</p>
              <p>{fields.descricao}</p>

              {fields.nome_caracteristica?.length > 0 && (
                <>
                  <strong>Características:</strong>
                  <Tags>
                    {fields.nome_caracteristica.map((c, i) => (
                      <Tag key={i}>{c}</Tag>
                    ))}
                  </Tags>
                </>
              )}
            </CardBody>

            <EditBtn onClick={() => navigate(`/editar/${id}`)}>
              <FiEdit2 size={16} /> Editar
            </EditBtn>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
