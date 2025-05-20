import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiPlus, FiEdit2, FiSearch, FiX } from 'react-icons/fi';

/* ---------- styled‑components ---------- */

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title   = styled.h1`
  font-size: 2.6rem; color: #2c3e50; text-align: center; margin-bottom: 2.5rem;
`;
const ActionBar = styled.div`
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 1rem; margin-bottom: 2rem;
`;

const SearchWrapper = styled.div`
  display: flex; align-items: center;
  background: #f2f2f2; border-radius: 10px;
  padding: 0.45rem 0.8rem; max-width: 400px; width: 100%;
`;
const SearchInput = styled.input`
  flex: 1; background: transparent; border: none;
  font-size: 1rem; padding: 0.35rem; outline: none;
`;
const ClearButton = styled.button`
  background: none; border: none; padding: 0.2rem;
  color: #666; cursor: pointer;
  &:hover { color: #222; }
`;
const ActionButton = styled.button`
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  background: ${({ variant }) =>
    variant === 'green' ? '#28a745'
    : variant === 'orange' ? '#ee5311'
    : '#0077cc'};
  color: #fff; border: none; border-radius: 10px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background: ${({ variant }) =>
      variant === 'green' ? '#218838'
      : variant === 'orange' ? '#b64e09'
      : '#005fa3'};
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 2rem;
`;

const Card = styled.article`
  background: #fff; border-radius: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  padding: 1.8rem; display: flex; flex-direction: column;
  transition: transform 0.3s;

  &:hover { transform: translateY(-6px); box-shadow: 0 10px 26px rgba(0,0,0,0.12); }
`;

const Nome      = styled.h2` font-size: 1.3rem; color: #34495e; margin-bottom: 0.6rem; `;
const Descricao = styled.p` font-size: 0.93rem; color: #555; margin-bottom: 1rem; `;
const EditBtn   = styled.button`
  align-self: flex-start; background: transparent;
  border: 2px solid #28a745; color: #28a745;
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.45rem 0.9rem; border-radius: 8px; font-weight: 600;
  cursor: pointer; transition: background 0.2s, color 0.2s;
  &:hover { background: #28a745; color: #fff; }
`;

/* -------------- Componente -------------- */

function Caracteristicas() {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
      })
      .then((res) => setCaracteristicas(res.data.records))
      .catch(console.error);
  }, []);

  const filtradas = busca
    ? caracteristicas
        .filter((c) =>
          c.fields.nome.toLowerCase().includes(busca.toLowerCase())
        )
        .sort((a, b) =>
          a.fields.nome.localeCompare(b.fields.nome, 'pt', { sensitivity: 'base' })
        )
    : caracteristicas.sort((a, b) =>
        a.fields.nome.localeCompare(b.fields.nome, 'pt', { sensitivity: 'base' })
      );

  return (
    <Container>
      <Title>
        <FiSettings style={{ verticalAlign: 'middle', marginRight: 8 }} />
        Características Cadastradas
      </Title>

      <ActionBar>
        <SearchWrapper>
          <FiSearch size={18} color="#666" style={{ marginRight: 6 }} />
          <SearchInput
            placeholder="Buscar característica..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          {busca && (
            <ClearButton onClick={() => setBusca('')}>
              <FiX size={18} />
            </ClearButton>
          )}
        </SearchWrapper>

        <ActionButton onClick={() => navigate('/caracteristicas/nova')}>
          <FiPlus size={18} /> Nova Característica
        </ActionButton>
      </ActionBar>

      <Grid>
        {filtradas.map(({ id, fields }) => (
          <Card key={id}>
            <Nome>{fields.nome}</Nome>
            <Descricao>{fields.descricao}</Descricao>
            <EditBtn onClick={() => navigate(`/caracteristicas/editar/${id}`)}>
              <FiEdit2 size={16} /> Editar
            </EditBtn>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Caracteristicas;
