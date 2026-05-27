import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { Edit, Badge, Phone, Person, AdminPanelSettings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../components/common/PageLayout";
import fotoPerfil from "../assets/roberto.jpg";

function PerfilPage() {
const navigate = useNavigate();

const funcionario = {
id: 1,
nome: "Roberto Souza",
matricula: "MAT001",
cpf: "123.456.789-00",
telefone: "(49) 99999-9999",
grupo: 1
};

const getGrupoLabel = (grupo) => {
if (grupo === 1) return "Administrador";
if (grupo === 2) return "Funcionário";
if (grupo === 3) return "Atendente";
return "Usuário";
};

const actions = (
<Button
variant="contained"
startIcon={<Edit />}
onClick={() => navigate('/perfil/editar')}
sx={{ fontWeight: 600 }}
>
Editar Perfil
</Button>
);

return (
<PageLayout title="Meu Perfil" actions={actions}>
<Grid container spacing={3}>

<Grid item xs={12} md={4}>
<Card sx={{ borderRadius: 3, textAlign: 'center' }}>
<CardContent sx={{ p: 4 }}>
<Avatar
src={fotoPerfil}
alt={funcionario.nome}
sx={{
width: 120,
height: 120,
mx: 'auto',
mb: 2,
border: '4px solid',
borderColor: 'primary.main',
boxShadow: 3
}}
>
{funcionario.nome.charAt(0)}
</Avatar>

<Typography variant="h5" sx={{ fontWeight: 700 }}>
{funcionario.nome}
</Typography>

<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
Matrícula: {funcionario.matricula}
</Typography>

<Chip
label={getGrupoLabel(funcionario.grupo)}
color="primary"
icon={<AdminPanelSettings />}
sx={{ fontWeight: 600 }}
/>
</CardContent>
</Card>
</Grid>

<Grid item xs={12} md={8}>
<Card sx={{ borderRadius: 3 }}>
<CardContent sx={{ p: 3 }}>
<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
Informações do Usuário
</Typography>

<Divider sx={{ mb: 3 }} />

<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
<Person sx={{ mr: 2, color: 'primary.main' }} />
<Box>
<Typography variant="body2" color="text.secondary">
Nome
</Typography>
<Typography variant="body1" sx={{ fontWeight: 600 }}>
{funcionario.nome}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
<Badge sx={{ mr: 2, color: 'primary.main' }} />
<Box>
<Typography variant="body2" color="text.secondary">
CPF
</Typography>
<Typography variant="body1" sx={{ fontWeight: 600 }}>
{funcionario.cpf}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
<Phone sx={{ mr: 2, color: 'primary.main' }} />
<Box>
<Typography variant="body2" color="text.secondary">
Telefone
</Typography>
<Typography variant="body1" sx={{ fontWeight: 600 }}>
{funcionario.telefone}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
<AdminPanelSettings sx={{ mr: 2, color: 'primary.main' }} />
<Box>
<Typography variant="body2" color="text.secondary">
Grupo de Acesso
</Typography>
<Typography variant="body1" sx={{ fontWeight: 600 }}>
{getGrupoLabel(funcionario.grupo)}
</Typography>
</Box>
</Box>

</CardContent>
</Card>
</Grid>

</Grid>
</PageLayout>
);
}

export default PerfilPage;