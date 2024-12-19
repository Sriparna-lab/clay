import React from 'react';
import { useParams} from "react-router-dom";
import Carousel from "../../Components/Accomodation/Carrousel";
import Tag from "../../Components/Accomodation/Tag";
import Rate from "../../Components/Accomodation/Rate";
import Header from "../../Components/header/Header";
import Footer from "../../Components/Footer/Footer";
import Collapse from "../../Components/Collapse/Collapse";
import NoPage from "../../Pages/Error/NoPage";
import { useFetch } from "../../utils/useFetch";


const Housing = () => {
      const { id } = useParams();
      const data = useFetch(`http://localhost:8080/api/properties`);
    
  const properties = data.find((logement) => logement.id === id);

  if(!properties){
    return<NoPage/>
  }

  const equipements = properties?.equipments.map((equipement, i) => {
    return (
      <ul key={i}>
        <li>{equipement}</li>
      </ul>
    );
  });

  const tags = properties?.tags.map((tags, i) => {
    return <Tag key={i} name={tags} />;
 });

  return (
    <div>
      <Header />
        <main>
          {properties ? (
          <div className="Fiche-container">
            <Carousel slides={properties.pictures} />
          </div>
          ): null}
        <section className="housing-page">
          <div className="accomodation-info">
            <div className="accomodation">
              <span className="accomodation__title">{properties?.title}</span>
              <span className="acomodation__location">
                {properties?.location}
              </span>
              <div className="tags">
                {tags}
              </div>
            </div>
             
            <div className="owner-info">
              <div className="owner-info__details">
                <p className="owner-info__name">{properties?.host.name}</p>
                <img
                  className="owner-info__pic"
                  src={properties?.host.picture}
                  alt=""
                />
              </div>
              <Rate score={properties?.rating} />
            </div>
          </div>

          <div className="accomodation-fiche">
            <div className="accomodation-fiche__description">
              <Collapse
                title="Description"
                content={properties?.description}
              />
            </div>
            <div className="accomodation-fiche__equipements">
              <Collapse
                title="Equipements"
                content={equipements}
              />
            </div>
          </div>
        </section>
        </main>
      <Footer />
    </div>
  );
};
    
export default Housing;
    