import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent, Typography, Box, Divider, Chip } from '@mui/material';
import { FiberNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../components/common/PageLayout";
import ActionButtons from "../components/common/ActionButtons";

function ComandaList() {
const navigate = useNavigate();

const comandas = [
{ id: 1, comanda: '1234', data_hora: '2026-05-27T19:30:00', status: 0, funcionario_id: 1, funcionario: { nome: 'Roberto Souza' }, cliente_id: 1, cliente: { nome: 'João da Silva' } },
{ id: 2, comanda: '1235', data_hora: '2026-05-27T20:10:00', status: 1, funcionario_id: 2, funcionario: { nome: 'Ana Oliveira' }, cliente_id: 2, cliente: { nome: 'Maria Oliveira' } },
{ id: 3, comanda: '1236', data_hora: '2026-05-27T21:00:00', status: 2, funcionario_id: 1, funcionario: { nome: 'Roberto Souza' }, cliente_id: null, cliente: null }
];

const actions = (
<Button variant="contained" color="primary" onClick={() => navigate('/comanda')} startIcon={<FiberNew />} sx={{ fontWeight: 600, px: 2, py: 1 }}>
Novo
</Button>
);

const getStatusLabel = (status) => {
if (status === 0) return 'Aberta';
if (status === 1) return 'Fechada';
if (status === 2) return 'Cancelada';
return 'Desconhecido';
};

const getStatusColor = (status) => {
if (status === 0) return 'success';
if (status === 1) return 'primary';
if (status === 2) return 'error';
return 'default';
};

const formatDate = (value) => {
return new Intl.DateTimeFormat('pt-BR', {
dateStyle: 'short',
timeStyle: 'short'
}).format(new Date(value));
};

const handleView = (comanda) => console.log("Visualizar comanda:", comanda);
const handleEdit = (comanda) => navigate(`/comanda/${comanda.id}`);
const handleDelete = (comanda) => console.log("Excluir comanda:", comanda);

const columns = [
{ field: 'id', headerName: 'ID' },
{ field: 'comanda', headerName: 'Comanda' },
{ field: 'data_hora', headerName: 'Data/Hora' },
{ field: 'status', headerName: 'Status' },
{ field: 'cliente', headerName: 'Cliente' },
{ field: 'funcionario', headerName: 'Funcionário' },
{ field: 'actions', headerName: 'Ações' }
];

// Função para renderizar uma linha da tabela em desktop
const renderDesktopRow = (comanda) => (
<TableRow key={comanda.id} hover>
{columns.map((column, index) => {
if (column.field === 'id') return <TableCell key={index}>{comanda.id}</TableCell>;

if (column.field === 'comanda') return (
<TableCell key={index} sx={{ fontWeight: 500 }}>
{comanda.comanda}
</TableCell>
);

if (column.field === 'data_hora') return (
<TableCell key={index}>
{formatDate(comanda.data_hora)}
</TableCell>
);

if (column.field === 'status') return (
<TableCell key={index}>
<Chip label={getStatusLabel(comanda.status)} color={getStatusColor(comanda.status)} size="small" />
</TableCell>
);

if (column.field === 'cliente') return (
<TableCell key={index}>
{comanda.cliente?.nome || 'Sem cliente'}
</TableCell>
);

if (column.field === 'funcionario') return (
<TableCell key={index}>
{comanda.funcionario?.nome || comanda.funcionario_id}
</TableCell>
);

if (column.field === 'actions') return (
<TableCell key={index}>
<ActionButtons onView={handleView} onEdit={handleEdit} onDelete={handleDelete} item={comanda} />
</TableCell>
);

return null;
})}
</TableRow>
);

// Função para renderizar um card em mobile
const renderMobileCard = (comanda) => (
<Card key={comanda.id} sx={{ mb: 2, elevation: 2 }}>
<CardContent sx={{ p: 2 }}>

<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
<Box>
<Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
Comanda {comanda.comanda}
</Typography>
<Typography variant="body2" color="text.secondary">
ID: {comanda.id}
</Typography>
</Box>

<Chip label={getStatusLabel(comanda.status)} color={getStatusColor(comanda.status)} size="small" />
</Box>

<Divider sx={{ mb: 2 }} />

<Box sx={{ mb: 2 }}>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
<Typography variant="body2" color="text.secondary">Data/Hora:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{formatDate(comanda.data_hora)}
</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
<Typography variant="body2" color="text.secondary">Cliente:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{comanda.cliente?.nome || 'Sem cliente'}
</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
<Typography variant="body2" color="text.secondary">Funcionário:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{comanda.funcionario?.nome || comanda.funcionario_id}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
<ActionButtons
item={comanda}
onView={handleView}
onEdit={handleEdit}
onDelete={handleDelete}
/>
</Box>

</CardContent>
</Card>
);

// Renderizar a tabela em desktop e os cards em mobile
return (
<PageLayout title="Comandas" actions={actions}>

<Box sx={{ display: { xs: 'none', md: 'block' } }}>
<TableContainer component={Paper}>
<Table>
<TableHead>
<TableRow>
{columns.map((column, index) => (
<TableCell key={index} sx={{ fontWeight: 600 }}>
{column.headerName || column.header}
</TableCell>
))}
</TableRow>
</TableHead>

<TableBody>
{comandas.map((comanda) => renderDesktopRow(comanda))}
</TableBody>
</Table>
</TableContainer>
</Box>

<Box sx={{ display: { xs: 'block', md: 'none' } }}>
{comandas.map((comanda) => renderMobileCard(comanda))}
</Box>

</PageLayout>
);
}

export default ComandaList;