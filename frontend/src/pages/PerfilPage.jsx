import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { Edit, Badge, Phone, Person, AdminPanelSettings, Work } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import PageLayout from "../components/common/PageLayout";
import fotoPerfil from "../assets/roberto.jpg";
import { getGrupoInfo } from "../constants/userGroups";

function PerfilPage() {
const navigate = useNavigate();
const { user, loading } = useAuth();

if (loading) {
return (
<PageLayout title="Meu Perfil">
<Typography>Carregando perfil...</Typography>
</PageLayout>
);
}

if (!user) {
return (
<PageLayout title="Meu Perfil">
<Typography>Não foi possível carregar os dados do usuário.</Typography>
</PageLayout>
);
}

const formatarCpf = (cpf) => {
if (!cpf) return "Não informado";
return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatarTelefone = (telefone) => {
if (!telefone) return "Não informado";
return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

const grupoInfo = getGrupoInfo(user?.grupo);

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
alt={user.nome}
sx={{
width: 120,
height: 120,
mx: 'auto',
mb: 2,
border: '4px solid',
borderColor: 'primary.main',
boxShadow: 3,
fontSize: 42
}}
>
{user?.nome ? user.nome.charAt(0).toUpperCase() : <Person />}
</Avatar>

<Typography variant="h5" sx={{ fontWeight: 700 }}>
{user.nome}
</Typography>

<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
Matrícula: {user.matricula || "Não informada"}
</Typography>

<Chip
label={grupoInfo.label}
color={grupoInfo.color}
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
{user.nome || "Não informado"}
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
{formatarCpf(user.cpf)}
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
{formatarTelefone(user.telefone)}
</Typography>
</Box>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
<Work sx={{ mr: 2, color: 'primary.main' }} />
<Box>
<Typography variant="body2" color="text.secondary">
Matrícula
</Typography>
<Typography variant="body1" sx={{ fontWeight: 600 }}>
{user.matricula || "Não informada"}
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
{grupoInfo.label}
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