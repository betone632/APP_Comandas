import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { FiberNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../components/common/PageLayout";
import ActionButtons from "../components/common/ActionButtons";

function FuncionarioList() {
const navigate = useNavigate();

const funcionarios = [
{ id: 1, nome: 'Roberto Souza', matricula: 'MAT001', cpf: '123.456.789-00', telefone: '(49) 99999-9999', grupo: 1 },
{ id: 2, nome: 'Ana Oliveira', matricula: 'MAT002', cpf: '987.654.321-00', telefone: '(49) 98888-8888', grupo: 2 },
{ id: 3, nome: 'Carlos Silva', matricula: 'MAT003', cpf: '456.789.123-00', telefone: '(49) 97777-7777', grupo: 3 }
];

const actions = (
<Button variant="contained" color="primary" onClick={() => navigate('/funcionario')} startIcon={<FiberNew />} sx={{ fontWeight: 600, px: 2, py: 1 }}>
Novo
</Button>
);

const handleView = (funcionario) => console.log("Visualizar funcionário:", funcionario);
const handleEdit = (funcionario) => navigate(`/funcionario/${funcionario.id}`);
const handleDelete = (funcionario) => console.log("Excluir funcionário:", funcionario);

const columns = [
{ field: 'id', headerName: 'ID' },
{ field: 'nome', headerName: 'Nome' },
{ field: 'matricula', headerName: 'Matrícula' },
{ field: 'cpf', headerName: 'CPF' },
{ field: 'telefone', headerName: 'Telefone' },
{ field: 'grupo', headerName: 'Grupo' },
{ field: 'actions', headerName: 'Ações', renderCell: (params) => <ActionButtons onView={handleView} onEdit={handleEdit} onDelete={handleDelete} item={params.row} /> }
];

// Função para renderizar uma linha da tabela em desktop
const renderDesktopRow = (funcionario) => (
<TableRow key={funcionario.id} hover>
{columns.map((column, index) => {
if (column.field === 'id') return <TableCell key={index}>{funcionario.id}</TableCell>;
if (column.field === 'nome') return <TableCell key={index} sx={{ fontWeight: 500 }}>{funcionario.nome}</TableCell>;
if (column.field === 'matricula') return <TableCell key={index}>{funcionario.matricula}</TableCell>;
if (column.field === 'cpf') return <TableCell key={index}>{funcionario.cpf}</TableCell>;
if (column.field === 'telefone') return <TableCell key={index}>{funcionario.telefone}</TableCell>;
if (column.field === 'grupo') return <TableCell key={index}>{funcionario.grupo}</TableCell>;

if (column.field === 'actions') return (
<TableCell key={index}>
<ActionButtons onView={handleView} onEdit={handleEdit} onDelete={handleDelete} item={funcionario} />
</TableCell>
);

return null;
})}
</TableRow>
);

// Função para renderizar um card em mobile
const renderMobileCard = (funcionario) => (
<Card key={funcionario.id} sx={{ mb: 2, elevation: 2 }}>
<CardContent sx={{ p: 2 }}>

<Box sx={{ mb: 2 }}>
<Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
{funcionario.nome}
</Typography>
<Typography variant="body2" color="text.secondary">
ID: {funcionario.id}
</Typography>
</Box>

<Divider sx={{ mb: 2 }} />

<Box sx={{ mb: 2 }}>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
<Typography variant="body2" color="text.secondary">Matrícula:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{funcionario.matricula}
</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
<Typography variant="body2" color="text.secondary">CPF:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{funcionario.cpf}
</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
<Typography variant="body2" color="text.secondary">Telefone:</Typography>
<Typography variant="body2" sx={{ fontWeight: 500 }}>
{funcionario.telefone}
</Typography>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
<Typography variant="body2" color="text.secondary">Grupo:</Typography>
<Typography variant="body2" sx={{ fontWeight: 600 }}>
{funcionario.grupo}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
<ActionButtons
item={funcionario}
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
<PageLayout title="Funcionários" actions={actions}>

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
{funcionarios.map((funcionario) => renderDesktopRow(funcionario))}
</TableBody>
</Table>
</TableContainer>
</Box>

<Box sx={{ display: { xs: 'block', md: 'none' } }}>
{funcionarios.map((funcionario) => renderMobileCard(funcionario))}
</Box>

</PageLayout>
);
}

export default FuncionarioList;