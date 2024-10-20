import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import RecipeCard from '../components/RecipeCard';
import TipCard from '../components/TipCard';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/system';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSpring, animated } from '@react-spring/web';
import Link from '@mui/material/Link';



const ENDPOINT = process.env.ENPOINT || 'http://localhost:5000';


const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#FFFFFF',
        '& fieldset': {
            borderColor: '#FFFFFF',
        },
        '&:hover fieldset': {
            borderColor: '#FFFFFF',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFFFFF',
        },
    },
    '& .MuiInputLabel-outlined': {
        color: '#808080',
    },
    '& .MuiInputBase-input': {
        color: '#808080',
    },
    width: '80%',
    maxWidth: '90%',
    margin: '2vh auto',
    display: 'block',
});

const exampleTips = [
    { id: 1, title: "Cortes de cebolla", desc: "Desc1", author: "Me" },
    { id: 2, title: "Cortes de pimiento", desc: "Desc2", author: "Me" },
    { id: 3, title: "Cortes de zanahoria", desc: "Desc3", author: "Me" },
    { id: 4, title: "Cortes de tomate", desc: "Desc4", author: "Me" },
    { id: 5, title: "Cortes de perejil", desc: "Desc5", author: "Me" },
    { id: 6, title: "Cortes de apio", desc: "Desc6", author: "Me" },
    { id: 7, title: "Cortes de carne", desc: "Desc7", author: "Me" },
]


const HomePage = () => {
    
    const themeMui = createTheme();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [dietAnchorEl, setDietAnchorEl] = useState(null);
    const [timeAnchorEl, setTimeAnchorEl] = useState(null);
    const [skillAnchorEl, setSkillAnchorEl] = useState(null);

    const [selectedDiet, setSelectedDiet] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const dietOptions = ["Vegano", "Vegetariano", "Keto"];
    const timeOptions = ["Menos de 30 min", "30-60 min", "Más de 60 min"];
    const skillOptions = ["Principiante", "Intermedio", "Avanzado"];

    const handleDietClick = (event) => {
        setDietAnchorEl(event.currentTarget);
    };

    const handleTimeClick = (event) => {
        setTimeAnchorEl(event.currentTarget);
    };

    const handleSkillClick = (event) => {
        setSkillAnchorEl(event.currentTarget);
    };

    const handleDietClose = (option) => {
        setDietAnchorEl(null);
        setSelectedDiet(option);
    };

    const handleTimeClose = (option) => {
        setTimeAnchorEl(null);
        setSelectedTime(option);
    };

    const handleSkillClose = (option) => {
        setSkillAnchorEl(null);
        setSelectedSkill(option);
    };


    const handleSearch = () => {
        //TODAVIA NO IMPLEMENTADO
    };

    
    const [recipesToDisplay, setRecipesToDisplay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 3;
    
    useEffect(() => {
        setLoading(true);
        fetch(`${ENDPOINT}/api/recipes`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                const shuffledRecipes = [...data].sort(() => 0.5 - Math.random());
                setRecipesToDisplay(shuffledRecipes);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
                setLoading(false);
            });
        }, []);
        
        const numPages = Math.ceil(recipesToDisplay.length / recipesPerPage);
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = recipesToDisplay.slice(indexOfFirstRecipe, indexOfLastRecipe);
        
        const recipeGridRef = useRef(null);
        
        const [springProps, setSpringProps] = useSpring(() => ({
            scrollTop: 0,
        }));
        

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        const offsetTop = recipeGridRef.current?.offsetTop || 0;
        setSpringProps({ scrollTop: offsetTop, onRest: () => { } });
    };


    const [tipsToDisplay, setTipsToDisplay] = useState([]);
    const [loadingTip, setLoadingTip] = useState(true);
    const [currentTip, setCurrentTip] = useState([]);
    const [currentPageTips, setCurrentPageTips] = useState(1);
    const tipsPerPage = 3;
    const tipGridRef = useRef(null);

    const [springPropsTips, setSpringPropsTips] = useSpring(() => ({
        scrollTop: 0,
    }));

    useEffect(() => {
        setLoadingTip(true);
        fetch(`${ENDPOINT}/api/tips`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                const shuffledTips = [...data].sort(() => 0.5 - Math.random());
                setTipsToDisplay(shuffledTips);
                const indexOfLastTip = currentPageTips * tipsPerPage;
                const indexOfFirstTip = indexOfLastTip - tipsPerPage;
                setCurrentTip(shuffledTips.slice(indexOfFirstTip, indexOfLastTip));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tips:", error);
                setLoading(false);
            });
    }, [currentPageTips]);


    const handlePageChangeTips = (event, value) => {
        setCurrentPageTips(value);
    };


    return (
        <ThemeProvider theme={themeMui}>
            <div style={{
                backgroundImage: 'radial-gradient(circle, #070e16, #041527)',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
                minHeight: '100vh',
                minWidth: 'auto',
                display: 'felx',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '1rem',
                    alignItems: 'center',
                    mb: '2%',
                    paddingTop: '2rem 0',
                    width: '100%',
                    marginTop: '5%'
                }}>
                    <img src="/Logo.png" alt="Vita Cocina Logo" style={{ height: '15rem', width: 'auto' }} />
                    {!isSmallScreen && (
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: '#FFFFFF',
                                fontSize: 'clamp(1rem, 6vw, 10rem)',
                                textAlign: 'center',
                            }}
                        >
                            VitaCocina
                        </Typography>
                    )}
                </Box>

                <Box sx={{
                    width: '80%',
                    margin: '2vh auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: "1%",

                }}>
                    <StyledTextField
                        id="search-bar"
                        variant="outlined"
                        size="small"
                        placeholder="Recetas o Consejos"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleSearch} aria-label="search" size="small">
                                        <SearchIcon sx={{ color: '#000000' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: '100%' }}

                    />
                    <Box sx={{
                        display: 'flex',
                        gap: "2%",
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: "center",
                    }}>
                        <Grid container spacing={"1%"} sx={{ alignItems: 'flex-start' }}>
                            <Grid item xs={12} sm={4}>
                                <Chip
                                    icon={<KeyboardArrowDownIcon style={{ color: 'white' }} />}
                                    label={selectedDiet || "Preferencia Dietética"}
                                    variant="outlined"
                                    deleteIcon={selectedDiet ? <CloseIcon style={{ color: 'white' }} /> : null}
                                    onClick={handleDietClick}
                                    onDelete={selectedDiet ? () => handleDietClose(null) : undefined}
                                    sx={{ color: 'white', width: 'auto', margin: isSmallScreen ? '0.5rem 0' : '0', minWidth: '200px', mx: 0.5 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Chip
                                    icon={<KeyboardArrowDownIcon style={{ color: 'white' }} />}
                                    label={selectedTime || "Tiempo"}
                                    variant="outlined"
                                    deleteIcon={selectedTime ? <CloseIcon style={{ color: 'white' }} /> : null}
                                    onClick={handleTimeClick}
                                    onDelete={selectedTime ? () => handleTimeClose(null) : undefined}
                                    sx={{ color: 'white', width: 'auto', margin: isSmallScreen ? '0.5rem 0' : '0', minWidth: '200px', mx: 0.5 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Chip
                                    icon={<KeyboardArrowDownIcon style={{ color: 'white' }} />}
                                    label={selectedSkill || "Habilidad culinaria"}
                                    variant="outlined"
                                    deleteIcon={selectedSkill ? <CloseIcon style={{ color: 'white' }} /> : null}
                                    onClick={handleSkillClick}
                                    onDelete={selectedSkill ? () => handleSkillClose(null) : undefined}
                                    sx={{ color: 'white', width: 'auto', margin: isSmallScreen ? '0.5rem 0' : '0', minWidth: '200px', mx: 0.5 }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Menu anchorEl={dietAnchorEl} open={Boolean(dietAnchorEl)} onClose={() => handleDietClose(null)} >
                        {dietOptions.map((option) => (
                            <MenuItem key={option} onClick={() => handleDietClose(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Menu anchorEl={timeAnchorEl} open={Boolean(timeAnchorEl)} onClose={() => handleTimeClose(null)} >
                        {timeOptions.map((option) => (
                            <MenuItem key={option} onClick={() => handleTimeClose(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Menu anchorEl={skillAnchorEl} open={Boolean(skillAnchorEl)} onClose={() => handleSkillClose(null)} >
                        {skillOptions.map((option) => (
                            <MenuItem key={option} onClick={() => handleSkillClose(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>

                </Box>

                <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontSize: 'clamp(1rem, 4vw, 6rem)',
                        textAlign: 'left',
                        marginLeft: '10%'
                    }}
                >
                    <Link href="/allrecipe" sx={{ color: '#ffffff', textDecoration: 'none' }}>Recetas</Link>
                </Typography>
                
                <animated.div style={{
                    scrollBehavior: 'smooth',
                    width: '100%',
                    overflowY: 'auto',
                    flex: 1
                }}
                    scrollTop={springProps.scrollTop}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                        <RecipeCard/>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={numPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            size="small"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "white"
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#f57c00",
                                    color: "white",
                                }
                            }} />
                    </Box>
                </animated.div>
                {/* TIPS */}
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontSize: 'clamp(1rem, 4vw, 6rem)',
                        textAlign: 'left',
                        marginLeft: '10%'
                    }}
                >
                <Link href="/alltip" sx={{ color: '#ffffff', textDecoration: 'none' }}>Consejos</Link>
                </Typography>

                <animated.div style={{
                    scrollBehavior: 'smooth',
                    width: '100%',
                    overflowY: 'auto',
                    flex: 1
                }}
                    scrollTop={springPropsTips.scrollTop}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: '2%' }}>
                        <TipCard tipData={currentTip}/>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={Math.ceil(tipsToDisplay.length / tipsPerPage)}
                            page={currentPageTips}
                            onChange={handlePageChangeTips}
                            size="small"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "white"
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#f57c00",
                                    color: "white",
                                }
                            }} />
                    </Box>
                </animated.div>

                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', textAlign: 'right' }}>
                        Tienes una cuenta?{' '}
                        <Link href="/login" sx={{ color: '#d98e2c', textDecoration: 'none' }}>INGRESA</Link> o
                        <Link href="/register" sx={{ color: '#d98e2c', textDecoration: 'none' }}> REGISTRATE</Link>
                    </Typography>
                </Box>
            </div>
        </ThemeProvider>
    )

}

export default HomePage