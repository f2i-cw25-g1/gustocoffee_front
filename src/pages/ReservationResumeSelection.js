import '../components/css/Reservation.css'
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

function ReservationResumeSelection(props) {
    let tableauSalonsSelectionnes = 
    [   {   id: "1",
            key: "1 2021-08-15 15:30 17:30",
            nom: "Salon Expresso",
            date: "2021-08-15",
            heureDebut: "15:30",
            heureFin: "17:30",
        },{ id: "2",
            key: "1 2021-08-15 16:00 18:00",
            nom: "Salon Dulcetto",
            date: "2021-08-15",
            heureDebut: "16:00",
            heureFin: "18:00",
        },{ id: "3",
            key: "1 2021-08-15 19:00 21:00",
            nom: "Salon Ambello",
            date: "2021-08-15",
            heureDebut: "19:00",
            heureFin: "21:00",
        }
    ];
    let prixOption1 = 10;
    let prixOption2 = 15;
    let tableauOptions = 
    [   {   id: "1",
            key: "1 Option1",
            nom: "Option 1",
            prixUnitaireHT: prixOption1,
            nombreReservations : 6,
            totalHT : prixOption1 * 6
        },{ id: "2",
            key: "2 Option2",
            nom: "Option 2",
            prixUnitaireHT: prixOption2,
            nombreReservations : 6,
            totalHT : prixOption2 * 6
        }
    ];
//-------------------------------------
//-------------------------------------
    const [tvaReservation, setTvaReservation] = useState([]);
    const [tvaOption, setTvaOption] = useState([]);
    const [prixHoraireReservationPlaceHT, setPrixHoraireReservationPlaceHT] = useState([]);
    const [prixHoraireReservationSalonHT, setPrixHoraireReservationSalonHT] = useState([]);
    
    const [prixOptionBureautiqueHT, setPrixOptionBureautiqueHT] = useState([]);
    const [prixOptionRestaurationHT, setPrixOptionRestaurationHT] = useState([]);

    const [optionBureautique, setOptionBureautique] = useState([]);
    const [optionRestauration, setOptionRestauration] = useState([]);

    const [placesSelectionnees, setPlacesSelectionnees] = useState([]);
    const [salonsSelectionnes, setSalonsSelectionnees] = useState([]);
    useEffect(() => {
        if(props.location.placesSelectionnees){
            console.log(props.location.placesSelectionnees.placesSelectionnees);
            setPlacesSelectionnees(props.location.placesSelectionnees.placesSelectionnees);
        }
        if(props.location.salonsSelectionnees){
            console.log(props.location.salonsSelectionnees.salonsSelectionnees);
            setSalonsSelectionnees(props.location.salonsSelectionnees.salonsSelectionnees);
        }else{//a supprimer quand la gestion des salons sera faite
            setSalonsSelectionnees(tableauSalonsSelectionnes);
        }
    }, [])

    useEffect(() => {
        console.log(placesSelectionnees.length);
        setPrixHoraireReservationPlaceHT({prix:2.5});
        setPrixHoraireReservationSalonHT({prix:15});
        setTvaReservation({montant:0.2});
        setTvaOption({montant:0.2});
        setPrixOptionBureautiqueHT({prix:12.5});
        setPrixOptionRestaurationHT({prix:7.5});
    }, [])

    const divOptionBureautique = useRef(null);
    const checkboxOptionBureautique = useRef(null);
    const divOptionRestauration = useRef(null);
    const checkboxOptionRestauration = useRef(null);
    useEffect(() => {
        console.log(prixOptionBureautiqueHT.prix)
        divOptionBureautique.current.onclick = function() {
            checkboxOptionBureautique.current.checked ^= 1;
            setOptionBureautique({
                nom:'Option Bureautique',
                checked:checkboxOptionBureautique.current.checked,
                prixUnitaireHT:prixOptionBureautiqueHT.prix,
                nombreReservations:placesSelectionnees.length + salonsSelectionnes.length
            });
        };
        divOptionRestauration.current.onclick = function() {
            checkboxOptionRestauration.current.checked ^= 1;
            setOptionRestauration({
                nom:'Option Restauration',
                checked:checkboxOptionRestauration.current.checked,
                prixUnitaireHT:prixOptionRestaurationHT.prix,
                nombreReservations:placesSelectionnees.length + salonsSelectionnes.length
            });
        };
    }, [prixOptionBureautiqueHT,prixOptionRestaurationHT])

    useEffect(() => {
        console.log(optionBureautique.prixUnitaireHT)
        console.log(placesSelectionnees);
        console.log(optionRestauration)

    }, [])

    return (
      <main>
        <div className="container">
            <p className="subsection_title">Résumé de votre sélection</p>
            <div>
                <p className="section_title2">Options</p>
                <p className="options_text">
                    Profitez d'une réduction de 10% sur les options en les sélectionnant lors de la réservation !
                </p>
                <div className="flex_checkbox">
                    <div ref={divOptionBureautique}>
                        <input type="checkbox" id="checkboxOptionBureautique" name="checkboxOptionBureautique" ref={checkboxOptionBureautique} />
                        <div className="custom_checkbox"></div>
                        <label htmlFor="checkboxOptionBureautique">Option bureautique
                        <br></br><br/>
                            <div>Accédez à notre espace bureautique comprenant des scanner à disposition, des imprimantes (jusqu'à 100 impressions). De plus, l'option bureautique vous permet d'accéder à une réduction sur l'achat de produits "bureautique" tel que les clés usb, souris, casques audio, etc.</div>
                        </label>
                    </div>
                    <div ref={divOptionRestauration}>
                        <input type="checkbox" id="checkboxOptionRestauration" name="checkboxOptionRestauration" ref={checkboxOptionRestauration}/>
                        <div className="custom_checkbox"></div>
                        <label htmlFor="checkboxOptionRestauration">Option restauration
                        <br></br><br/>
                            <div>L'option restauration vous permet d'accéder à l'espace "Restauration" avec les privilèges suivants : cafés, thés et diverses boissons fraiches mais aussi croissants, pains au chocolat et pains au raison à volonté. L'option restauration vous permet également d'avoir des réductions sur les autres produits de notre gamme "Restauration"  </div>
                        </label>
                    </div>
                </div>
            </div>

            

            <p className="section_title2">Vos places et salons sélectionnés</p>
            <div className="table_overflow">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>le</th>
                            <th>de</th>
                            <th>à</th>
                            <th>prix HT</th>
                            <th>TVA {tvaReservation.prix *100} %</th>
                            <th>prix TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {placesSelectionnees.map((a) => {
                        return  <tr key={a.key}>
                                    <td>Place {a.nom}</td>
                                    <td>{moment(a.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                    <td>{a.heureDebut}</td>
                                    <td>{a.heureFin}</td>
                                    <td>x €</td>
                                    <td>(calcul tva)</td>
                                    <td>500€</td>
                                </tr>;
                        })}
                        {salonsSelectionnes.map((a) => {
                        return  <tr key={a.key}>
                                    <td>{a.nom}</td>
                                    <td>{moment(a.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                    <td>{a.heureDebut}</td>
                                    <td>{a.heureFin}</td>
                                    <td>x €</td>
                                    <td>(calcul tva)</td>
                                    <td>500€</td>
                                </tr>;
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td id="totalPlacesSalonsHT">500 €</td>
                            <td>(calcul tva)</td>
                            <td>5000€</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            

            {(optionBureautique.checked || optionRestauration.checked) && 
            <>
            <p className="section_title2">Vos options</p>
            <div className="table_overflow">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>prix unitaire HT</th>
                            <th>Nombre de réservations</th>
                            <th>prix HT</th>
                            <th>TVA {tvaOption.montant *100} %</th>
                            <th>prix TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {optionBureautique.checked && 
                        <tr>
                            <td>{optionBureautique.nom}</td>
                            <td>{optionBureautique.prixUnitaireHT}</td>
                            <td>{optionBureautique.nombreReservations}</td>
                            <td>{(optionBureautique.prixUnitaireHT*optionBureautique.nombreReservations)}</td>
                            <td>{(optionBureautique.prixUnitaireHT*optionBureautique.nombreReservations)*tvaOption.montant}</td>
                            <td>{(optionBureautique.prixUnitaireHT*optionBureautique.nombreReservations)*(1+tvaOption.montant)}</td>
                        </tr>
                        }
                        {optionRestauration.checked && 
                        <tr>
                            <td>{optionRestauration.nom}</td>
                            <td>{optionRestauration.prixUnitaireHT}</td>
                            <td>{optionRestauration.nombreReservations}</td>
                            <td>{(optionRestauration.prixUnitaireHT*optionRestauration.nombreReservations)}</td>
                            <td>{(optionRestauration.prixUnitaireHT*optionRestauration.nombreReservations)*tvaOption.montant}</td>
                            <td>{(optionRestauration.prixUnitaireHT*optionRestauration.nombreReservations)*(1+tvaOption.montant)}</td>
                        </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td id="totalOptionsHT"></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            </>
            }
            <p className="section_title2">Résumé prix</p>
            <div className="table_overflow">
                <table>
                    <thead>
                        <tr>
                            <th></th>   
                            <th>Total HT</th>
                            <th>Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total places et salons</td>
                            <td>x €</td>
                            <td>x €</td>
                        </tr>
                        {(optionBureautique.checked || optionRestauration.checked) && 
                        <>
                        <tr>
                            <td>Total options</td>
                            <td>x €</td>
                            <td>x €</td>
                        </tr>
                        </>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total à payer</td>
                            <td>x €</td>
                            <td>x €</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <br></br>
            <a className="sub_button2">Payer</a>
        </div>
      </main>
    );
}
  
export default ReservationResumeSelection;