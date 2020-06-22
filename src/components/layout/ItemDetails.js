import React, { useState, useEffect } from 'react'

function ItemDetails(props) {
    const state = {
        item_id: props.match.params.id,
        items: [],
        dataloaded: false,
    }

    const [item_id] = useState(state.item_id);
    const [items, setItems] = useState(state.items);
    const [dataloaded, setDataLoaded] = useState(state.dataloaded);

    useEffect(() => {
        const getItems = async () => {
            //console.log("p1", dataloaded);
            let requrl = 'https://api.emetroplus.com/drug/';
            let data = { 'drug_id': item_id };
            fetch(requrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response =>
                    response.json()
                )
                .then(data => {
                    //console.log(data);
                    if (data.ok && data) {
                        //console.log("p2", dataloaded);
                        setItems(data.drug_details);
                        setDataLoaded(true);
                        //console.log("p3", dataloaded);
                    }
                })
        }
        getItems()
    }, [item_id])
    //console.log(item_id);

    return dataloaded ? (
        <div className="search">
            {
                <table>
                    <tbody key={items._id}>
                        <tr>
                            <td>
                                Name </td><td>:
                            </td>
                            <td>
                                {items.doctorPrescriptionName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Used In </td><td>:
                            </td>
                            <td>
                                {items.businessName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Used At </td><td>:
                            </td>
                            <td>
                                {items.uses}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Manufacturer </td><td>:
                            </td>
                            <td>
                                {items.manufacturer}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Price </td><td>:
                            </td>
                            <td>
                                {items.netAmount}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                How it Works </td><td>:
                            </td>
                            <td>
                                {items.howItWorks}
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    ) : (
            <div>Loading...</div>
        )
}



// class ItemDetails extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             item_id: this.props.match.params.id,
//             items: [],
//             dataloaded : false,
//         }
//     }

//     getItems() {
//         console.log("p1",dataloaded);
//         let requrl = 'https://api.emetroplus.com/drug/';
//         let data = { 'drug_id': item_id };
//         fetch(requrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         })
//             .then(response =>
//                 response.json()
//             )
//             .then(data => {
//                 //console.log(data);
//                 if (data.ok && data) {
//                     console.log("p2",dataloaded);

//                     this.setState({
//                         items: [data.drug_details],
//                         dataloaded : true,
//                     })
//                     console.log("p3",dataloaded);
//                 }
//             })
//             return false;
//     }

//     render() {

//         return (
//             <div>
//                 <div>
//                     {
//                         dataloaded === false ? this.getItems() : <div className="search"><p>About the Medicine : </p></div>
//                     }
//                 </div>
//                 <div>
//                     {
//                         items.length > 0 ?
//                             <table>
//                                 <tbody key={items._id}>
//                                     <tr>
//                                         <td>
//                                             Name :
//                                         </td>
//                                         <td>
//                                             {items.doctorPrescriptionName}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             Used In :
//                                         </td>
//                                         <td>
//                                             {items.businessName}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             Used At :
//                                         </td>
//                                         <td>
//                                             {items.uses}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             Manufacturer :
//                                         </td>
//                                         <td>
//                                             {items.manufacturer}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             Price :
//                                         </td>
//                                         <td>
//                                             {items.netAmount}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             How it Works :
//                                         </td>
//                                         <td>
//                                             {items.howItWorks}
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             : <p>No records Found </p>
//                     }
//                 </div>
//             </div>
//         );
//     }
// }

export default ItemDetails;