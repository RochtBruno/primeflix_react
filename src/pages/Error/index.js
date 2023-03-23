import "./error.css";
import { Link } from "react-router-dom";
function Error() {
  return (
    <div className="not-found">
      <h1>Oops! Parece que a página que está tentando acessar não existe </h1>
      <Link to="/">Ver todos os filmes</Link>
    </div>
  );
}
export default Error;
