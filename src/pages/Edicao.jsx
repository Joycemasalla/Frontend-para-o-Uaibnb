import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Save, ArrowLeft } from 'lucide-react';

/* ---------- styled-components ---------- */

const Container = styled.div`
  max-width: 700px;
  margin: 5rem auto;
  padding: 3rem 2rem;
  background-color: #f8f9fa;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.4rem;
  font-weight: 600;
  color: #2c3e50;
`;

const FormGroup = styled.div`margin-bottom: 1.8rem;`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #374151;
`;

const inputBase = `
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.25s;
  background-color: #fff;
  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 8px rgba(59,130,246,.4);
  }
`;
const Input    = styled.input`${inputBase}`;
const Textarea = styled.textarea`${inputBase} resize: vertical; min-height: 100px;`;

/* —— pills de características —— */
const CaracteristicasWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const CaracteristicaOption = styled.label`
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#3b82f6' : '#e5e7eb')};
  color: ${({ selected }) => (selected ? '#fff' : '#374151')};
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#2563eb' : '#d1d5db')};
  }
`;
const HiddenCheckbox = styled.input`display:none;`;

/* —— botões —— */
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  flex-direction: column;
  @media (min-width: 420px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;
const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .45rem;
  padding: 1.2rem;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  border-radius: 14px;
  color: #fff;
  background-color: ${({ bg }) => bg || '#007bff'};
  cursor: pointer;
  transition: background-color .3s;
  &:hover { background-color: ${({ hover }) => hover || '#0056b3'}; }
`;

/* ---------- componente ---------- */

function EditarHospedagem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo,  setTitulo]  = useState('');
  const [cidade,  setCidade]  = useState('');
  const [preco,   setPreco]   = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem,  setImagem]  = useState('');

  /* características */
  const [listaCarac, setListaCarac] = useState([]);          // todas
  const [selecionadas, setSelecionadas] = useState([]);      // ids escolhidos

  /* -------- carregamento inicial -------- */
  useEffect(() => {
    (async () => {
      const headers = { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` };
      try {
        // paralelo: locação + todas características
        const [locRes, carRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes/${id}`, { headers }),
          axios.get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, { headers })
        ]);

        const loc = locRes.data.fields;
        setTitulo(loc.titulo);
        setCidade(loc.cidade);
        setPreco(loc.preco.toString());
        setDescricao(loc.descricao);
        setImagem(loc.imagem || '');
        setSelecionadas(loc.locacao_caracteristicas || []);  // pré-seleciona

        setListaCarac(carRes.data.records || []);
      } catch (err) {
        console.error(err);
        toast.error('Erro ao carregar dados.');
      }
    })();
  }, [id]);

  /* -------- handlers -------- */
  const toggleCaracteristica = (carID) =>
    setSelecionadas((prev) =>
      prev.includes(carID) ? prev.filter((v) => v !== carID) : [...prev, carID]
    );

  /* -------- envio -------- */
  async function handleUpdate(e) {
    e.preventDefault();
    const precoNum = Number(preco.replace(/\./g,'').replace(',','.'));

    if (!titulo || !cidade || !descricao || !imagem)   { toast.error('Preencha todos os campos'); return; }
    if (descricao.length < 10)                         { toast.error('Descrição muito curta');   return; }
    if (isNaN(precoNum) || precoNum <= 0)              { toast.error('Preço inválido');          return; }

    try {
      await axios.patch(
        `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes/${id}`,
        {
          fields: {
            titulo,
            cidade,
            preco: precoNum,
            descricao,
            imagem,
            locacao_caracteristicas: selecionadas,   // aqui está o update!
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Hospedagem atualizada!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      toast.error('Falha ao atualizar.');
    }
  }

  /* ---------- render ---------- */
  return (
    <Container>
      <Title>Editar Hospedagem</Title>

      <form onSubmit={handleUpdate} noValidate>
        <FormGroup>
          <Label>Título *</Label>
          <Input value={titulo} onChange={(e)=>setTitulo(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Cidade *</Label>
          <Input value={cidade} onChange={(e)=>setCidade(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Preço (R$) *</Label>
          <Input value={preco} onChange={(e)=>setPreco(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Descrição *</Label>
          <Textarea value={descricao} onChange={(e)=>setDescricao(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Imagem (URL) *</Label>
          <Input type="url" value={imagem} onChange={(e)=>setImagem(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Características</Label>
          <CaracteristicasWrapper>
            {listaCarac.map((c) => {
              const relId = c.fields.locacao_caracteristicas?.[0];
              if (!relId) return null;                   // segurança
              return (
                <CaracteristicaOption
                  key={relId}
                  selected={selecionadas.includes(relId)}
                  htmlFor={`car-${relId}`}
                >
                  <HiddenCheckbox
                    id={`car-${relId}`}
                    type="checkbox"
                    checked={selecionadas.includes(relId)}
                    onChange={() => toggleCaracteristica(relId)}
                  />
                  {c.fields.nome}
                </CaracteristicaOption>
              );
            })}
          </CaracteristicasWrapper>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" bg="#28a745" hover="#218838">
            <Save size={18}/> Salvar
          </Button>
          <Button type="button" bg="#6c757d" hover="#5a6268" onClick={()=>navigate('/')}>
            <ArrowLeft size={18}/> Voltar
          </Button>
        </ButtonGroup>
      </form>

      <ToastContainer position="top-right" autoClose={2000}/>
    </Container>
  );
}

export default EditarHospedagem;
