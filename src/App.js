import react, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';



import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    getdata()
  }, [])

  const getdata = async () => {

    var url = 'https://restcountries.com/v3.1/subregion/asia'

    await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then((response) => response.json())
      .then((data) => { setData(data) });
  }



  return (
    <>
      <Button variant="contained" style={{ fontWeight: "bolder", fontSize: '20px', width: '100%' }} type="button" onClick={(getdata)}>Refresh Data</Button>


      {data ?
        <div className="ag-theme-alpine" style={{ height: 749, width: '100%' }}>
          <AgGridReact
            rowData={data}>

            <AgGridColumn field="Sr. No."
              cellRendererFramework={(data) => {


                return (
                  <>{data.rowIndex + 1}</>
                )
              }}

            />


            <AgGridColumn field="country"

              cellRendererFramework={(data) => {

                return data.data.name.common

              }}
            />



            <AgGridColumn field="capital"
              cellRendererFramework={(data) => {

                return (
                  <>{data.data.capital}</>
                )
              }} />

            <AgGridColumn field="flag"
              cellRendererFramework={(data) => {

                return (
                  <>
                    <img style={{ width: '40px', marginTop: "5px" }} src={data.data.flags.png} />
                  </>
                )
              }} />

            <AgGridColumn field="region"
              cellRendererFramework={(data) => {

                return (
                  <>{data.data.region}</>
                )
              }} />

            <AgGridColumn field="subregion"
              cellRendererFramework={(data) => {

                return (
                  <>{data.data.subregion}</>
                )
              }} />


            <AgGridColumn field="population"
              cellRendererFramework={(data) => {

                return (
                  <>{data.data.population}</>
                )
              }} />

            <AgGridColumn field="borders"
              cellRendererFramework={(data) => {

                if (data.data.borders) {
                  return (
                    <>{data.data.borders.map((val) => {
                      return `${val},`
                    })}</>
                  )
                } else {
                  return (
                    <>
                      <p style={{ color: 'red' }}>NA</p>
                    </>

                  )
                }


              }} />

            <AgGridColumn field="languages"
              cellRendererFramework={(data) => {
                if (data.data.languages) {

                  const keys = Object.values(data.data.languages)

                  return (
                    <>
                      {keys.map((val) => {

                        return (
                          <>
                            {val},
                          </>
                        )
                      })}
                    </>
                  )
                } else {
                  return (
                    <>
                      hello
                    </>
                  )
                }



              }} />

          </AgGridReact>
        </div>
        :
        <>
         
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
           open='true'
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>

      }




    </>
  );
}

export default App;
