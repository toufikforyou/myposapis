import 'dotenv/config';
import app from './src/index';

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
}); 