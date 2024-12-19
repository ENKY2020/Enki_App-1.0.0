import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (replace with your project URL and anon key)
const supabase = createClient('https://your-project-url.supabase.co', 'your-public-anon-key');

// Fetch products function
const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Fetched products:', data);
    return data; // You can use this data in your components
  }
};

// Example use in a React component
const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(data => setProducts(data)); // Set state with fetched products
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.cost} (Status: {product.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
const updateProductStatus = async (productId, newStatus) => {
    const { data, error } = await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', productId);  // Assuming 'id' is the column for product ID
  
    if (error) {
      console.error('Error updating product status:', error);
    } else {
      console.log('Updated product status:', data);
      // Optionally update the UI to reflect the change
    }
  };
  
  // Example usage: update the status of product with ID 1 to 'approved'
  updateProductStatus(1, 'approved');
  