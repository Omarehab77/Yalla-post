const designs = {
  saveDesign: async (design) => {
    const savedDesigns = JSON.parse(localStorage.getItem('designs') || '[]');
    savedDesigns.push(design);
    localStorage.setItem('designs', JSON.stringify(savedDesigns));
    return design;
  },
  
  getDesigns: async (userId) => {
    const designs = JSON.parse(localStorage.getItem('designs') || '[]');
    return designs.filter(design => design.userId === userId);
  }
};

export default designs;  // Now you can import it as a default export