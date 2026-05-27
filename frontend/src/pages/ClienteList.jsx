import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { FiberNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../components/common/PageLayout";
import ActionButtons from "../components/common/ActionButtons";

function ClienteList() {
const navigate = useNavigate();

const clientes = [
{ id: 1, nome: 'João da Silva', cpf: '123.456.789-00', telefone: '(49) 99999-9999' },
{ id: 2, nome: 'Maria Oliveira', cpf: '987.654.321-00', telefone: '(49) 98888-8888' },
{ id: 3, nome: 'Carlos Souza', cpf: '456.789.123-00', telefone: '(49) 97777-7777' }
];

const actions = (
<Button variant="contained" color="primary" onClick={() => navigate('/cliente')} startIcon={<FiberNew />} sx={{ fontWeight: 600, px: 2, py: 1 }}>
Novo
</Button>
);

const handleView = (cliente) => console.log("Visualizar cliente:", cliente);
const handleEdit = (cliente) => navigate(`/cliente/${cliente.id}`);
const handleDelete = (cliente) => console.log("Excluir cliente:", cliente);

const columns = [
{ field: 'id', headerName: 'ID' },
{ field: 'nome', headerName: 'Nome' },
{ field: 'cpf', headerName: 'CPF' },
{ field: 'telefone', headerName: 'Telefone' },
{ field: 'actions', headerName: 'Ações', renderCell: (params) => <ActionButtons onView={handleView} onEdit={handleEdit} onDelete={handleDelete} item={params.row} /> }
];

// Função para renderizar uma linha da tabela em desktop
const renderDesktopRow = (cliente) => (
<TableRow key={cliente.id} hover>
{columns.map((column, index) => {
if (column.field === 'id') return <TableCell key={index}>{cliente.id}</TableCell>;
if (column.field === 'nome') return <TableCell key={index} sx={{ fontWeight: 500 }}>{cliente.nome}</TableCell>;
if (column.field === 'cpf') return <TableCell key={index}>{cliente.cpf}</TableCell>;
if (column.field === 'telefone') return <TableCell key={index}>{cliente.telefone}</TableCell>;

if (column.field === 'actions') return (
<TableCell key={index}>
<ActionButtons onView={handleView} onEdit={handleEdit} onDelete={handleDelete} item={cliente} />
</TableCell>
);

return null;
})}
</TableRow>
);

// Função para renderizar um card em mobile
const renderMobileCard = (cliente) => (
<Card key={cliente.id} sx={{ mb: 2, elevation: 2 }}>
<CardContent sx={{ p: 2 }}>

<Box sx={{ mb: 2 }}>
<Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
{cliente.nome}
</Typography>
<Typography variant="body2" color="text.secondary">
ID: {cliente.id}
</Typography>
</Box>

<Divider sx={{ mb: 2 }} />

<Box sx={{ mb: 2 }}>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
<Typography variant="body2" color="text.secondary">CPF:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{cliente.cpf}
</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
<Typography variant="body2" color="text.secondary">Telefone:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{cliente.telefone}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
<ActionButtons
item={cliente}
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
<PageLayout title="Clientes" actions={actions}>

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
{clientes.map((cliente) => renderDesktopRow(cliente))}
</TableBody>
</Table>
</TableContainer>
</Box>

<Box sx={{ display: { xs: 'block', md: 'none' } }}>
{clientes.map((cliente) => renderMobileCard(cliente))}
</Box>

</PageLayout>
);
}

export default ClienteList;