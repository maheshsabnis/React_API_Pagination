import React, { Component, useState, useEffect } from 'react';
import Pagination from '../utilities/pagination';
import './pagination.css';
 
import HttpService from '../services/httpservice';
import CustomersEmployeesShippers from '../models/CustomersEmployeesShippers';
import ResponseObject from '../models/ResponseObject';
const PaginationComponent=()=>{
    // State property for storing received records from API
    let [fetchedRecords, setRecords] = useState([]);
    // array for Page Size
    const recordsSize = [1,5,10,15,20,25,30,35,40,45,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900];
    // Selecting Page size the default value is 5 records
    const [selectedRecordSizePerPage,setRecSizePerPage] = useState(5);
    // State Property for Table Headers
    let [headers,setHeaders] = useState([]);
    // Instance of CustomersEmployeesShippers to read its properties
    const modelInstance=new CustomersEmployeesShippers()
    // Count of Records received from the Server
    let [totalRecordLengthFromServer, setRecordLength] = useState(0);
    // the paging state property that will be used to generate page numbers
    let [paging,setPaging] = useState([]);
    // The service class instance
    const serv = new HttpService();
    // the Response object
    let responseObject = new ResponseObject();
    // Get the Total Number of Records present on the server
    // get the 5 records
    useEffect(()=>{
         async function created(){
            setHeaders(Object.keys(modelInstance));
            
            // make to the service and get All records by default
            responseObject  = await  serv.getData(5,0);
            // set values for state properties
             setRecords(responseObject.data.CustomersEmployeesShipper);
             setPaging(generatePageNumbers(responseObject.data.TotalRecords, selectedRecordSizePerPage));
             setRecordLength(responseObject.data.TotalRecords);
        } 
        created();
         
    },[]); 

    // Method that will be executed when the page number is clicked
    // this will make call to REST API and get data to show on the Page
    const selectPageNumber= async(pgNumber)=>{
         
        let pageSize = selectedRecordSizePerPage * parseInt(pgNumber);
        responseObject = await serv.getData(selectedRecordSizePerPage,pageSize); 
        setRecords(responseObject.data.CustomersEmployeesShipper);
        pageSize = 0;
    }
    // Method that will be called when the Record Per Page
    // Drop Down is clicked. This will show Records fetched from the API
    // by calling the API
    const changePageSize= async(pgSize)=>{
        setPaging(generatePageNumbers(totalRecordLengthFromServer, pgSize));
        responseObject =  await serv.getData(pgSize,0);
        setRecords(responseObject.data.CustomersEmployeesShipper);
    }
    // Method to generate page numbers. We will call this 
    // when the component is loaded and change event for the
    // No of Records Per Page drop down and the click event
    // on the page numbers
    const generatePageNumbers=(records,selectedpgSize=5)=>{
       
        let pagination = new Pagination();
        // create page numbers so that we can show them at the bottom of the table
        let pages = pagination.pageCount(records,selectedpgSize);
            let pageNumbers = [];
            // the pagination generation
            for (let index = 0; index <= pages; index++) {
                pageNumbers.push({
                    pageId:index 
                    });
            }    
            
            return pageNumbers;
        }


    return (
        <div>
            <h1>Perform The Server-Side Pagination</h1>
            <div>
                <label>Select no. of Records Per Page</label>
                <select className="form-control" 
                   value={selectedRecordSizePerPage}
                   onChange={(evt)=>{
                    setRecSizePerPage(parseInt(evt.target.value)); 
                    changePageSize(evt.target.value);}}>
                    {
                        recordsSize.map((recSize,idx)=>(
                            <option key={idx}>{recSize}</option>
                        ))
                    } 
                </select>
            </div>
            <br/>
            <div className="divPage">
                <table className="table table-striped table-bordered table-hover">
                    <thead className='headers'>
                        <tr>
                            {
                               headers.map((col,idx)=>(
                                <th key={idx} className="thead-dark">{col}</th>
                               ))         
                               
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fetchedRecords.map((record,idx)=>(
                                <tr className="table-info"
                                 key={idx}>
                                    {
                                        headers.map((col,idx)=>(
                                            <td key={idx} className="thead-dark">{record[col]}</td>
                                         ))         
                               
                                    }
                                </tr>
                            ))
                        }
                      
                    </tbody>
                </table>
            </div>
            <br/>
            <div className="divPage">
                <nav aria-label="navigation">
                    <ul className="pagination">
                        {
                            paging.map((pageNo,idx)=>(
                                <li className="page-item c@pgIndex"
                                   key={idx} onClick={()=>selectPageNumber(pageNo.pageId)}>   
                                     <a className="page-link">{pageNo.pageId}</a>
                                </li>
                              
                            )) 
                        } 
                    </ul>
                </nav>
             </div>
        </div>
    );
};

export default PaginationComponent;