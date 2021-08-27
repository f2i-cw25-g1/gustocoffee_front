import '../components/css/Reservation.css'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import moment from 'moment';

import {useRefresh} from 'react-tidy'
function ReservationResumeSelection(props) {
    let tableauSalonsSelectionnes = 
    [   {   id: "1",
            key: "1 2021-08-15 15:30 17:30",
            nom: "Salon Expresso",
            date: "2021-08-15",
            heureDebut: "15:30",
            heureFin: "17:45",
        },{ id: "2",
            key: "1 2021-08-15 16:00 18:00",
            nom: "Salon Dulcetto",
            date: "2021-08-15",
            heureDebut: "16:00",
            heureFin: "18:30",
        },{ id: "3",
            key: "1 2021-08-15 19:00 21:00",
            nom: "Salon Ambello",
            date: "2021-08-15",
            heureDebut: "19:00",
            heureFin: "21:45",
        }
    ];
    /*
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
    */
//-------------------------------------
//-------------------------------------
    const refresh = useRefresh();
    const [tvaReservation, setTvaReservation] = useState([]);
    const [tvaOption, setTvaOption] = useState([]);
    const [prixHoraireReservationPlaceHT, setPrixHoraireReservationPlaceHT] = useState([]);
    const [prixHoraireReservationSalonHT, setPrixHoraireReservationSalonHT] = useState([]);
    
    const [prixOptionBureautiqueHT, setPrixOptionBureautiqueHT] = useState([]);
    const [prixOptionRestaurationHT, setPrixOptionRestaurationHT] = useState([]);

    const [placesSelectionnees, setPlacesSelectionnees] = useState([]);
    const [salonsSelectionnes, setSalonsSelectionnees] = useState([]);

    useEffect(() => {
        setPrixHoraireReservationPlaceHT({prix:2.5});
        setPrixHoraireReservationSalonHT({prix:15});
        setTvaReservation({montant:0.2});
        setTvaOption({montant:0.2});
        setPrixOptionBureautiqueHT({prix:12.5});
        setPrixOptionRestaurationHT({prix:7.5});
    }, [])

    const calculPrixReservationHT = (heureDebut, heureFin, prixHoraireHT) => {//normalement : calcul prix ht
        let minutesFin = parseInt(heureFin.split(':')[0])*60+parseInt(heureFin.split(':')[1]);
        let minutesDebut = parseInt(heureDebut.split(':')[0])*60+parseInt(heureDebut.split(':')[1]);
        let tempsMinutesReservees = minutesFin - minutesDebut;
        return prixHoraireHT.prix/60*tempsMinutesReservees//5.203 = 5.20, 5.208 = 5.21;
    }

    useEffect(() => {
        if(props.location.placesSelectionnees){
            let provisoire = props.location.placesSelectionnees.placesSelectionnees;
            provisoire.forEach((placeSelectionnee ) => {
                placeSelectionnee.prixHT = calculPrixReservationHT(placeSelectionnee.heureDebut, placeSelectionnee.heureFin,prixHoraireReservationPlaceHT).toFixed(2);
                placeSelectionnee.montantTVA = (calculPrixReservationHT(placeSelectionnee.heureDebut, placeSelectionnee.heureFin,prixHoraireReservationPlaceHT)*tvaReservation.montant).toFixed(2);
                placeSelectionnee.prixTTC = (calculPrixReservationHT(placeSelectionnee.heureDebut, placeSelectionnee.heureFin,prixHoraireReservationPlaceHT)*(1+tvaReservation.montant)).toFixed(2);
            });
            setPlacesSelectionnees(provisoire);
        }
        refresh();
    }, [placesSelectionnees,prixHoraireReservationPlaceHT,tvaReservation])

    const [totalPrixPlaces, setTotalPrixPlaces] = useState([]);
    const [totalPrixSalons, setTotalPrixSalons] = useState([]);
    const [total, setPrixTotal] = useState([]);
    useEffect(() => {
        let totalHT = 0;
        let totalTVA = 0;
        let prixTotalTTC = 0;
        placesSelectionnees.forEach((placeSelectionnee) => {
            totalHT += parseFloat(placeSelectionnee.prixHT);
            totalTVA += parseFloat(placeSelectionnee.montantTVA);
            prixTotalTTC += parseFloat(placeSelectionnee.prixTTC);
        });
        setTotalPrixPlaces({
            totalHT : totalHT.toFixed(2),
            totalTVA : totalTVA.toFixed(2),
            prixTotalTTC : prixTotalTTC.toFixed(2)
        })
    }, [placesSelectionnees])


    useEffect(() => {
        if(props.location.salonsSelectionnees){
            setSalonsSelectionnees(props.location.salonsSelectionnees.salonsSelectionnees);
        }else{//a supprimer quand la gestion des salons sera faite
            setSalonsSelectionnees(tableauSalonsSelectionnes);
        }
    }, [setSalonsSelectionnees])



//options
    const [optionBureautique, setOptionBureautique] = useState([]);
    const [optionRestauration, setOptionRestauration] = useState([]);
    const [totalOptions, setTotalOptions] =useState([]);

    const divOptionBureautique = useRef(null);
    const checkboxOptionBureautique = useRef(null);
    const divOptionRestauration = useRef(null);
    const checkboxOptionRestauration = useRef(null);
    useEffect(() => {        
        setOptionBureautique({
            prixTotalHT:0,
            prixTotalTVA:0,
            prixTotalTTC:0
        });
        setOptionRestauration({
            prixTotalHT:0,
            prixTotalTVA:0,
            prixTotalTTC:0
        });
    }, [])

    useEffect(() => {
        //console.log(prixOptionBureautiqueHT.prix)
        divOptionBureautique.current.onclick = function() {
            checkboxOptionBureautique.current.checked ^= 1;
            setOptionBureautique({
                nom:'Option Bureautique',
                checked:checkboxOptionBureautique.current.checked,
                prixUnitaireHT:prixOptionBureautiqueHT.prix,
                nombreReservations:placesSelectionnees.length + salonsSelectionnes.length,
                prixTotalHT:parseFloat(prixOptionBureautiqueHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)).toFixed(2),
                prixTotalTVA:parseFloat(prixOptionBureautiqueHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)*tvaOption.montant).toFixed(2),
                prixTotalTTC:parseFloat(prixOptionBureautiqueHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)*(1+tvaOption.montant)).toFixed(2)
            });
        };
        divOptionRestauration.current.onclick = function() {
            checkboxOptionRestauration.current.checked ^= 1;
            setOptionRestauration({
                nom:'Option Restauration',
                checked:checkboxOptionRestauration.current.checked,
                prixUnitaireHT:prixOptionRestaurationHT.prix,
                nombreReservations:placesSelectionnees.length + salonsSelectionnes.length,
                prixTotalHT:parseFloat(prixOptionRestaurationHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)).toFixed(2),
                prixTotalTVA:parseFloat(prixOptionRestaurationHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)*tvaOption.montant).toFixed(2),
                prixTotalTTC:parseFloat(prixOptionRestaurationHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)*(1+tvaOption.montant)).toFixed(2)
            });
        };
    }, [prixOptionBureautiqueHT,prixOptionRestaurationHT,tvaOption])

    useEffect(() => {        
        //console.log(parseFloat(prixOptionRestaurationHT.prix*(placesSelectionnees.length + salonsSelectionnes.length)).toFixed(2))
        //console.log(parseFloat(optionRestauration.prixTotalHT))

        //console.log((optionBureautique.checked ? parseFloat(optionBureautique.prixTotalHT) : 0))
        let optionBureautiqueHT = (optionBureautique.checked ? parseFloat(optionBureautique.prixTotalHT) : 0)
        let optionBureautiqueTVA = (optionBureautique.checked ? parseFloat(optionBureautique.prixTotalTVA) : 0)
        let optionBureautiqueTTC = (optionBureautique.checked ? parseFloat(optionBureautique.prixTotalTTC) : 0)

        let optionRestaurationHT = (optionRestauration.checked ? parseFloat(optionRestauration.prixTotalHT) : 0)
        let optionRestaurationTVA = (optionRestauration.checked ? parseFloat(optionRestauration.prixTotalTVA) : 0)
        let optionRestaurationTTC = (optionRestauration.checked ? parseFloat(optionRestauration.prixTotalTTC) : 0)
        setTotalOptions({
            prixTotalHT:(optionBureautiqueHT+optionRestaurationHT).toFixed(2),
            prixTotalTVA:(optionBureautiqueTVA+optionRestaurationTVA).toFixed(2),
            prixTotalTTC:(optionBureautiqueTTC+optionRestaurationTTC).toFixed(2)
        });
    }, [optionBureautique, optionRestauration])

//render
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
                            <th>TVA {tvaReservation.montant *100} %</th>
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
                                    <td>{a.prixHT}</td>
                                    <td>{a.montantTVA}</td>
                                    <td>{a.prixTTC}</td>
                                </tr>;
                        })}
                        {salonsSelectionnes.map((a) => {
                        return  <tr key={a.key}>
                                    <td>{a.nom}</td>
                                    <td>{moment(a.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                    <td>{a.heureDebut}</td>
                                    <td>{a.heureFin}</td>
                                    <td>333</td>
                                    <td>333</td>
                                    <td>333 €</td>
                                </tr>;
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td id="totalPlacesSalonsHT">{parseFloat('500').toFixed(2)}</td>
                            <td>{parseFloat('0').toFixed(2)}(calcul tva)</td>
                            <td>{parseFloat('5000').toFixed(2)} €</td>
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
                            <td>{parseFloat(optionBureautique.prixUnitaireHT).toFixed(2)}</td>
                            <td>{optionBureautique.nombreReservations}</td>
                            <td>{optionBureautique.prixTotalHT}</td>
                            <td>{parseFloat((optionBureautique.prixUnitaireHT*optionBureautique.nombreReservations)*tvaOption.montant).toFixed(2)}</td>
                            <td>{parseFloat((optionBureautique.prixUnitaireHT*optionBureautique.nombreReservations)*(1+tvaOption.montant)).toFixed(2)} €</td>
                        </tr>
                        }
                        {optionRestauration.checked && 
                        <tr>
                            <td>{optionRestauration.nom}</td>
                            <td>{parseFloat(optionRestauration.prixUnitaireHT).toFixed(2)}</td>
                            <td>{optionRestauration.nombreReservations}</td>
                            <td>{parseFloat((optionRestauration.prixUnitaireHT*optionRestauration.nombreReservations)).toFixed(2)}</td>
                            <td>{parseFloat((optionRestauration.prixUnitaireHT*optionRestauration.nombreReservations)*tvaOption.montant).toFixed(2)}</td>
                            <td>{parseFloat((optionRestauration.prixUnitaireHT*optionRestauration.nombreReservations)*(1+tvaOption.montant)).toFixed(2)} €</td>
                        </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td>{totalOptions.prixTotalHT}</td>
                            <td>{totalOptions.prixTotalTVA}</td>
                            <td>{totalOptions.prixTotalTTC} €</td>
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
                            <th>Total TVA</th>
                            <th>Total TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total places et salons</td>
                            <td>{totalPrixPlaces.totalHT} €</td>
                            <td>{totalPrixPlaces.totalTVA} €</td>
                            <td>{totalPrixPlaces.prixTotalTTC} €</td>
                        </tr>
                        {(optionBureautique.checked || optionRestauration.checked) && 
                        <>
                        <tr>
                            <td>Total options</td>
                            <td>{totalOptions.prixTotalHT} €</td>
                            <td>{totalOptions.prixTotalTVA} €</td>
                            <td>{totalOptions.prixTotalTTC} €</td>
                        </tr>
                        </>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total à payer</td>
                            <td>{(parseFloat(totalPrixPlaces.totalHT)+parseFloat(totalOptions.prixTotalHT)).toFixed(2)} €</td>
                            <td>{(parseFloat(totalPrixPlaces.totalTVA)+parseFloat(totalOptions.prixTotalTVA)).toFixed(2)} €</td>
                            <td>{(parseFloat(totalPrixPlaces.prixTotalTTC)+parseFloat(totalOptions.prixTotalTTC)).toFixed(2)} €</td>
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