import '../components/css/Reservation.css'

function ReservationResumeSelection() {
    let tableauPlacesSelectionnees = 
    [   {   id: "1",
            key: "1 2021-08-15 15:30 17:30",
            nom: "D1",
            date: "2021-08-15",
            heureDebut: "15:30",
            heureFin: "17:30",
        },{ id: "2",
            key: "1 2021-08-15 16:00 18:00",
            nom: "D3",
            date: "2021-08-15",
            heureDebut: "16:00",
            heureFin: "18:00",
        },{ id: "3",
            key: "1 2021-08-15 19:00 21:00",
            nom: "D4",
            date: "2021-08-15",
            heureDebut: "19:00",
            heureFin: "21:00",
        }
    ];

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
                    <div className="click_checkbox">
                        <input type="checkbox" id="optionBureautique" name="optionBureautique" />
                        <div className="custom_checkbox"></div>
                        <label for="optionBureautique">Option bureautique
                        <br></br><br/>
                            <div>Accédez à notre espace bureautique comprenant des scanner à disposition, des imprimantes (jusqu'à 100 impressions). De plus, l'option bureautique vous permet d'accéder à une réduction sur l'achat de produits "bureautique" tel que les clés usb, souris, casques audio, etc.</div>
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="optionRestauration" name="optionRestauration" />
                        <div className="custom_checkbox"></div>
                        <label for="optionRestauration">Option restauration
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
                            <th>TVA 20%</th>
                            <th>prix TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableauPlacesSelectionnees.map((a) => {
                        return  <tr key={a.key}>
                                    <td>Place {a.nom}</td>
                                    <td>{a.date}</td>
                                    <td>{a.heureDebut}</td>
                                    <td>{a.heureFin}</td>
                                    <td>x €</td>
                                    <td>(calcul tva)</td>
                                    <td>500€</td>
                                </tr>;
                        })}
                        {tableauSalonsSelectionnes.map((a) => {
                        return  <tr key={a.key}>
                                    <td>{a.nom}</td>
                                    <td>{a.date}</td>
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
            
            <p className="section_title2">Vos options</p>
            <div className="table_overflow">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>prix unitaire HT</th>
                            <th>Nombre de réservations</th>
                            <th>prix HT</th>
                            <th>TVA 20%</th>
                            <th>prix TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableauOptions.map((a) => {
                        return  <tr key={a.key}>
                                    <td>{a.nom}</td>
                                    <td>{a.prixUnitaireHT}</td>
                                    <td>{a.nombreReservations}</td>
                                    <td>{a.totalHT} €</td>
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
                            <td id="totalOptionsHT">500 €</td>
                            <td>(calcul tva)</td>
                            <td>5000€</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

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
                        <tr>
                            <td>Total options</td>
                            <td>x €</td>
                            <td>x €</td>
                        </tr>
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
            <a className="sub_button2">Passer la commande</a>
        </div>
      </main>
    );
}
  
export default ReservationResumeSelection;