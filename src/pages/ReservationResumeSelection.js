import '../components/css/Reservation.css'
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { useRefresh } from 'react-tidy'
const ReservationResumeSelection = (props) => {
    const refresh = useRefresh();
    const [tvaReservation, setTvaReservation] = useState([]);
    const [tvaOption, setTvaOption] = useState([]);
    const [prixHoraireReservationPlaceHT, setPrixHoraireReservationPlaceHT] = useState([]);
    const [prixHoraireReservationSalonHT, setPrixHoraireReservationSalonHT] = useState([]);

    const [prixOptionBureautiqueHT, setPrixOptionBureautiqueHT] = useState([]);
    const [prixOptionRestaurationHT, setPrixOptionRestaurationHT] = useState([]);

    const [placesSelectionnees, setPlacesSelectionnees] = useState([]);
    const [salonsSelectionnes, setSalonsSelectionnes] = useState([]);

    useEffect(() => {
        setPrixHoraireReservationPlaceHT({ prix: 2.5 });
        setPrixHoraireReservationSalonHT({ prix: 15 });
        setTvaReservation({ montant: 0.2 });
        setTvaOption({ montant: 0.2 });
        setPrixOptionBureautiqueHT({ prix: 12.5 });
        setPrixOptionRestaurationHT({ prix: 7.5 });
    }, [])

    const calculPrixReservationHT = (heureDebut, heureFin, prixHoraireHT) => {
        let minutesOffertesHeureCreuses = 0;
        let minutesFin = parseInt(heureFin.split(':')[0]) * 60 + parseInt(heureFin.split(':')[1]);
        let minutesDebut = parseInt(heureDebut.split(':')[0]) * 60 + parseInt(heureDebut.split(':')[1]);
        let tempsMinutesReservees = minutesFin - minutesDebut;
        if (parseInt(heureDebut.split(':')[0]) === 7 && parseInt(heureDebut.split(':')[1]) === 0 && tempsMinutesReservees >= 180) {
            minutesOffertesHeureCreuses += 60;
        }
        if (parseInt(heureFin.split(':')[0]) === 22 && parseInt(heureFin.split(':')[1]) === 0 && tempsMinutesReservees >= 180) {
            minutesOffertesHeureCreuses += 60;
        }
        return prixHoraireHT.prix / 60 * (tempsMinutesReservees - minutesOffertesHeureCreuses)//5.203 = 5.20, 5.208 = 5.21;
    }

    useEffect(() => {
        if (props.location.placesSelectionnees) {
            let provisoire = props.location.placesSelectionnees.placesSelectionnees;
            provisoire.forEach((placeSelectionnee) => {
                placeSelectionnee.prixHT = calculPrixReservationHT(placeSelectionnee.heureDebut, placeSelectionnee.heureFin, prixHoraireReservationPlaceHT).toFixed(2);
                placeSelectionnee.montantTVA = (calculPrixReservationHT(placeSelectionnee.heureDebut, placeSelectionnee.heureFin, prixHoraireReservationPlaceHT) * tvaReservation.montant).toFixed(2);
                placeSelectionnee.prixTTC = (calculPrixReservationHT(placeSelectionnee.heureDebut, placeSelectionnee.heureFin, prixHoraireReservationPlaceHT) * (1 + tvaReservation.montant)).toFixed(2);
            });
            setPlacesSelectionnees(provisoire);
        }
        refresh();
    }, [placesSelectionnees, prixHoraireReservationPlaceHT, tvaReservation])

    useEffect(() => {
        if (props.location.salonsSelectionnes) {
            let provisoire = props.location.salonsSelectionnes.salonsSelectionnes;
            provisoire.forEach((salonSelectionne) => {
                salonSelectionne.prixHT = calculPrixReservationHT(salonSelectionne.heureDebut, salonSelectionne.heureFin, prixHoraireReservationSalonHT).toFixed(2);
                salonSelectionne.montantTVA = (calculPrixReservationHT(salonSelectionne.heureDebut, salonSelectionne.heureFin, prixHoraireReservationSalonHT) * tvaReservation.montant).toFixed(2);
                salonSelectionne.prixTTC = (calculPrixReservationHT(salonSelectionne.heureDebut, salonSelectionne.heureFin, prixHoraireReservationSalonHT) * (1 + tvaReservation.montant)).toFixed(2);
            });
            setSalonsSelectionnes(props.location.salonsSelectionnes.salonsSelectionnes);
        }
        refresh();
    }, [salonsSelectionnes, prixHoraireReservationSalonHT, tvaReservation])

    const [totalPrixPlaces, setTotalPrixPlaces] = useState([]);
    const [totalPrixSalons, setTotalPrixSalons] = useState([]);
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
            totalHT: totalHT.toFixed(2),
            totalTVA: totalTVA.toFixed(2),
            prixTotalTTC: prixTotalTTC.toFixed(2)
        })
        totalHT = 0;
        totalTVA = 0;
        prixTotalTTC = 0;
        salonsSelectionnes.forEach((salonSelectionne) => {
            totalHT += parseFloat(salonSelectionne.prixHT);
            totalTVA += parseFloat(salonSelectionne.montantTVA);
            prixTotalTTC += parseFloat(salonSelectionne.prixTTC);
        });
        setTotalPrixSalons({
            totalHT: totalHT.toFixed(2),
            totalTVA: totalTVA.toFixed(2),
            prixTotalTTC: prixTotalTTC.toFixed(2)
        })
    }, [placesSelectionnees, salonsSelectionnes])

    //options
    const [optionBureautique, setOptionBureautique] = useState([]);
    const [optionRestauration, setOptionRestauration] = useState([]);
    const [totalOptions, setTotalOptions] = useState([]);

    const divOptionBureautique = useRef(null);
    const checkboxOptionBureautique = useRef(null);
    const divOptionRestauration = useRef(null);
    const checkboxOptionRestauration = useRef(null);
    useEffect(() => {
        setOptionBureautique({
            prixTotalHT: 0,
            prixTotalTVA: 0,
            prixTotalTTC: 0
        });
        setOptionRestauration({
            prixTotalHT: 0,
            prixTotalTVA: 0,
            prixTotalTTC: 0
        });
    }, [])

    useEffect(() => {
        //console.log(prixOptionBureautiqueHT.prix)
        divOptionBureautique.current.onclick = function () {
            checkboxOptionBureautique.current.checked ^= 1;
            setOptionBureautique({
                nom: 'Option Bureautique',
                checked: checkboxOptionBureautique.current.checked,
                prixUnitaireHT: prixOptionBureautiqueHT.prix.toFixed(2),
                nombreReservations: placesSelectionnees.length + salonsSelectionnes.length,
                prixTotalHT: parseFloat(prixOptionBureautiqueHT.prix * (placesSelectionnees.length + salonsSelectionnes.length)).toFixed(2),
                prixTotalTVA: parseFloat(prixOptionBureautiqueHT.prix * (placesSelectionnees.length + salonsSelectionnes.length) * tvaOption.montant).toFixed(2),
                prixTotalTTC: parseFloat(prixOptionBureautiqueHT.prix * (placesSelectionnees.length + salonsSelectionnes.length) * (1 + tvaOption.montant)).toFixed(2)
            });
        };
        divOptionRestauration.current.onclick = function () {
            checkboxOptionRestauration.current.checked ^= 1;
            setOptionRestauration({
                nom: 'Option Restauration',
                checked: checkboxOptionRestauration.current.checked,
                prixUnitaireHT: prixOptionRestaurationHT.prix.toFixed(2),
                nombreReservations: placesSelectionnees.length + salonsSelectionnes.length,
                prixTotalHT: parseFloat(prixOptionRestaurationHT.prix * (placesSelectionnees.length + salonsSelectionnes.length)).toFixed(2),
                prixTotalTVA: parseFloat(prixOptionRestaurationHT.prix * (placesSelectionnees.length + salonsSelectionnes.length) * tvaOption.montant).toFixed(2),
                prixTotalTTC: parseFloat(prixOptionRestaurationHT.prix * (placesSelectionnees.length + salonsSelectionnes.length) * (1 + tvaOption.montant)).toFixed(2)
            });
        };
    }, [prixOptionBureautiqueHT, prixOptionRestaurationHT, tvaOption])

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
            prixTotalHT: (optionBureautiqueHT + optionRestaurationHT).toFixed(2),
            prixTotalTVA: (optionBureautiqueTVA + optionRestaurationTVA).toFixed(2),
            prixTotalTTC: (optionBureautiqueTTC + optionRestaurationTTC).toFixed(2)
        });
    }, [optionBureautique, optionRestauration])

    //render
    return (
        <>
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
                                    <br></br><br />
                                    <div>Accédez à notre espace bureautique comprenant des scanner à disposition, des imprimantes (jusqu'à 100 impressions). De plus, l'option bureautique vous permet d'accéder à une réduction sur l'achat de produits "bureautique" tel que les clés usb, souris, casques audio, etc.</div>
                                    <div>
                                        Prix journalier par réservation : {(prixOptionBureautiqueHT.prix * (1 + tvaOption.montant)).toFixed(2)}€ TTC
                                    </div>
                                </label>
                            </div>
                            <div ref={divOptionRestauration}>
                                <input type="checkbox" id="checkboxOptionRestauration" name="checkboxOptionRestauration" ref={checkboxOptionRestauration} />
                                <div className="custom_checkbox"></div>
                                <label htmlFor="checkboxOptionRestauration">Option restauration
                                    <br></br><br />
                                    <div>L'option restauration vous permet d'accéder à l'espace "Restauration" avec les privilèges suivants : cafés, thés et diverses boissons fraiches mais aussi croissants, pains au chocolat et pains au raison à volonté. L'option restauration vous permet également d'avoir des réductions sur les autres produits de notre gamme "Restauration"  </div>
                                    <div>
                                        Prix journalier par réservation : {(prixOptionRestaurationHT.prix * (1 + tvaOption.montant)).toFixed(2)}€ TTC
                                    </div>
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
                                    <th>TVA {tvaReservation.montant * 100} %</th>
                                    <th>prix TTC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placesSelectionnees.map((a) => {
                                    return <tr key={a.key}>
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
                                    return <tr key={a.key}>
                                        <td>{a.nom}</td>
                                        <td>{moment(a.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                        <td>{a.heureDebut}</td>
                                        <td>{a.heureFin}</td>
                                        <td>{a.prixHT}</td>
                                        <td>{a.montantTVA}</td>
                                        <td>{a.prixTTC}</td>
                                    </tr>;
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{(parseFloat(totalPrixPlaces.totalHT) + parseFloat(totalPrixSalons.totalHT)).toFixed(2)} €</td>
                                    <td>{(parseFloat(totalPrixPlaces.totalTVA) + parseFloat(totalPrixSalons.totalTVA)).toFixed(2)} €</td>
                                    <td>{(parseFloat(totalPrixPlaces.prixTotalTTC) + parseFloat(totalPrixSalons.prixTotalTTC)).toFixed(2)} €</td>
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
                                            <th>TVA {tvaOption.montant * 100} %</th>
                                            <th>prix TTC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {optionBureautique.checked &&
                                            <tr>
                                                <td>{optionBureautique.nom}</td>
                                                <td>{optionBureautique.prixUnitaireHT}</td>
                                                <td>{optionBureautique.nombreReservations}</td>
                                                <td>{optionBureautique.prixTotalHT}</td>
                                                <td>{optionBureautique.prixTotalTVA}</td>
                                                <td>{optionBureautique.prixTotalTTC} €</td>
                                            </tr>
                                        }
                                        {optionRestauration.checked &&
                                            <tr>
                                                <td>{optionRestauration.nom}</td>
                                                <td>{optionRestauration.prixUnitaireHT}</td>
                                                <td>{optionRestauration.nombreReservations}</td>
                                                <td>{optionRestauration.prixTotalHT}</td>
                                                <td>{optionRestauration.prixTotalTVA}</td>
                                                <td>{optionRestauration.prixTotalTTC} €</td>
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
                                    <td>{(parseFloat(totalPrixPlaces.totalHT) + parseFloat(totalPrixSalons.totalHT)).toFixed(2)} €</td>
                                    <td>{(parseFloat(totalPrixPlaces.totalTVA) + parseFloat(totalPrixSalons.totalTVA)).toFixed(2)} €</td>
                                    <td>{(parseFloat(totalPrixPlaces.prixTotalTTC) + parseFloat(totalPrixSalons.prixTotalTTC)).toFixed(2)} €</td>
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
                                    <td>{(parseFloat(totalPrixPlaces.totalHT) + parseFloat(totalPrixSalons.totalHT) + parseFloat(totalOptions.prixTotalHT)).toFixed(2)} €</td>
                                    <td>{(parseFloat(totalPrixPlaces.totalTVA) + parseFloat(totalPrixSalons.totalTVA) + parseFloat(totalOptions.prixTotalTVA)).toFixed(2)} €</td>
                                    <td>{(parseFloat(totalPrixPlaces.prixTotalTTC) + parseFloat(totalPrixSalons.prixTotalTTC) + parseFloat(totalOptions.prixTotalTTC)).toFixed(2)} €</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <br></br>
                    <a className="sub_button2">Payer</a>
                </div>
            </main>
        </>
    );
}

export default ReservationResumeSelection;