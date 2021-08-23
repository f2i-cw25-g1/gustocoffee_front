function ReservationResumeSelection() {
    let tableauPlacesSelectionnees = 
    [
        {
            id: "1",
            key: "1 2021-08-15 15:30 17:30",
            nom: "D1",
            date: "2021-08-15",
            heureDebut: "15:30",
            heureFin: "17:30",
          },
          {
            id: "2",
            key: "1 2021-08-15 16:00 18:00",
            nom: "D3",
            date: "2021-08-15",
            heureDebut: "16:00",
            heureFin: "18:00",
          },
          {
            id: "3",
            key: "1 2021-08-15 19:00 21:00",
            nom: "D4",
            date: "2021-08-15",
            heureDebut: "19:00",
            heureFin: "21:00",
          }
    ];

    let tableauSalonsSelectionnes = [
        {
            id: "1",
            key: "1 2021-08-15 15:30 17:30",
            nom: "Salon Expresso",
            date: "2021-08-15",
            heureDebut: "15:30",
            heureFin: "17:30",
          },
          {
            id: "2",
            key: "1 2021-08-15 16:00 18:00",
            nom: "Salon Dulcetto",
            date: "2021-08-15",
            heureDebut: "16:00",
            heureFin: "18:00",
          },
          {
            id: "3",
            key: "1 2021-08-15 19:00 21:00",
            nom: "Salon Ambello",
            date: "2021-08-15",
            heureDebut: "19:00",
            heureFin: "21:00",
          }
    ];

    let prixOption1 = 10;
    let prixOption2 = 15;

    let tableauOptions = [
        {
        id: "1",
        key: "1 Option1",
        nom: "Option 1",
        prixUnitaireHT: prixOption1,
        nombreReservations : 6,
        totalHT : prixOption1 * 6
        },
        {
            id: "2",
            key: "2 Option2",
            nom: "Option 2",
            prixUnitaireHT: prixOption2,
            nombreReservations : 6,
            totalHT : prixOption2 * 6
        }
    ];

    return (
      <main>
        <div>
            Résumé de votre sélection
            <table>
                <tr>
                    <td></td>
                    <th>le</th>
                    <th>de</th>
                    <th>à</th>
                    <th>prix HT</th>
                    <th>TVA 20%</th>
                    <th>prix TTC</th>
                </tr>
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
                <tr>
                    <td colspan="4">Total</td>
                    <td id="totalPlacesSalonsHT">500 €</td>
                    <td>(calcul tva)</td>
                    <td>5000€</td>
                </tr>
            </table>


            <table>
                <tr>
                    <td></td>
                    <th>prix unitaire HT</th>
                    <th>Nombre de réservations concernées</th>
                    <th>Total HT</th>
                    <th>TVA 20%</th>
                    <th>prix TTC</th>
                </tr>
                    {tableauOptions.map((a) => {
                    return  <tr key={a.key}>
                                <td>{a.nom}</td>
                                <td>{a.prixUnitaireHT}</td>
                                <td>{a.nombreReservations}</td>
                                <td>{a.totalHT} €</td>
                            </tr>;
                    })}
                <tr>
                    <td colspan="3">Total</td>
                    <td id="totalOptionsHT">500 €</td>
                    <td>(calcul tva)</td>
                    <td>5000€</td>
                </tr>
            </table>

<br></br>
            Résumé prix
            <table>
                <tr>
                    <td></td>   
                    <th>Total HT</th>
                    <th>Total TTC</th>
                </tr>
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
                
                <tr>
                    <td>Total à payer</td>
                    <td>x €</td>
                    <td>x €</td>
                </tr>
            </table>

<br></br><br></br>  
            <div>
                Options
                <button>Option A</button>
                <button>Option B</button>
            </div>
        </div>
      </main>
    );
}
  
export default ReservationResumeSelection;