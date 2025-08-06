import ;

// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await db.getCategories();
    res.json({
      success: true,
      data: categories,
      total: categories.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des catégories'
    });
  }
};
