require('dotenv').config();
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '288e22zo',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN
});

async function testConnection() {
  try {
    console.log('Testing Sanity connection...');
    const products = await client.fetch('*[_type == "product"] | [0...5] { _id, name, price }');
    console.log(`✅ Found ${products.length} products (showing first 5):`);
    console.log(JSON.stringify(products, null, 2));
    
    const allProducts = await client.fetch('count(*[_type == "product"])');
    console.log(`\n📊 Total products in database: ${allProducts}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();
