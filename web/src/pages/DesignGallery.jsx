// import React, { useState, useEffect, useContext } from 'react';
// import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
// import { AuthContext } from './Pages/AuthContext';
// import { getDesigns } from './Pages/designs';

// const DesignGallery = () => {
//   const [designs, setDesigns] = useState([]);
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     if (currentUser) {
//       const loadDesigns = async () => {
//         const userDesigns = await getDesigns(currentUser.id);
//         setDesigns(userDesigns);
//       };
//       loadDesigns();
//     }
//   }, [currentUser]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         My Designs ({designs.length})
//       </Typography>
//       <Grid container spacing={3}>
//         {designs.map((design, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={design.thumbnail || '/default-design.png'}
//                 alt={design.name}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h6">
//                   {design.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Created: {new Date(design.createdAt).toLocaleDateString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default DesignGallery;