import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";
function Filme() {
  const { id } = useParams();
  const navigate = useNavigate;
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function carregarFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "7aec8ffe180d33bbc8c3f1e87a9709a8",
            language: "pt-BR",
          },
        })
        .then((res) => {
          setFilme(res.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    carregarFilme();
    return () => {
      console.log("Componente desmontado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      alert("ESSE FILME JÁ ESTA NA LISTA");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("FILME SALVO COM SUCESSO");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes do filme</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} />
      <h3>Sinopse:</h3>
      <p>{filme.overview}</p>
      <strong>Avaliação : {filme.vote_average} /10</strong>
      <div className="area-btn">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            rel="external"
            target="blank"
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
