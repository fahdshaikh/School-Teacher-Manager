import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import TeacherCard from './TeacherCard';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

const Wrapper = styled.div`
    overflow-x: hidden;
    font-family: sans-serif;
    background: #f8f9fa;
    div {
        // border: 1px solid red;
    }
    padding: 30px;
`;

const FilterWrapper = styled.div`
    overflow-x: hidden;
    font-family: sans-serif;
    background: #f8f9fa;
    border: 1px dashed darkgray;
    box-shadow: 0 4px 7px 0 rgba(218, 220, 230, 7.9);
    div {
        // border: 1px solid black;
    }
    // padding: 60px;
`;

const Dashboard = () => {
    const [data, setData] = useState([]);
    let [page, setPage] = useState(1);
    let [limit] = useState(4);
    let [total, setTotal] = useState(0);

    const getInitialData = () => {
        axios
            .get('http://localhost:5000/api/teacher')
            .then((res) => {
                // setData(res.data);
                console.log(res.data.length);
                setTotal(res.data.length);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getInitialData();
    }, [data]);

    const getData = () => {
        let url = 'http://localhost:5000/api/teacher/pagination';

        axios
            .get(url, { params: { page: page, limit: limit } })
            .then((res) => {
                setData(res.data.current);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData();
    }, [page, limit]);
    return (
        <>
            <Navbar />
            <Wrapper>
                <FilterWrapper className='container p-0'>
                    <div
                        className='row justify-content-between'
                        // style={{ border: '1px solid red' }}
                    >
                        <div className='col'>
                            <div className='row '>
                                <div
                                    className='col-2 p-2'
                                    style={{ backgroundColor: '#e9ecef' }}
                                >
                                    <b> Search</b>
                                </div>
                                <div
                                    className='col text-left input-group input-group-md'
                                    style={{ backgroundColor: 'white' }}
                                >
                                    {' '}
                                    <input
                                        type='text'
                                        className='form-control '
                                        placeholder='Name'
                                        style={{
                                            border: '1px solid white',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-auto mr-4 pl-2 pb-0 pr-2 pt-2'>
                            <div className='row'>
                                <div className='col mr-2'>
                                    <b>Filter</b>
                                </div>
                                <div className='col'>Gender:</div>
                                <button
                                    type='button'
                                    className='btn col btn-sm btn-info mr-1'
                                >
                                    Male
                                </button>
                                <button
                                    type='button'
                                    className='btn col mr-2 btn-sm btn-info'
                                >
                                    Female
                                </button>
                                <div className='col '>Age: </div>
                                <button
                                    type='button'
                                    className='col btn btn-sm btn-info mr-1'
                                >{`<40`}</button>
                                <button
                                    type='button'
                                    className='col btn btn-sm btn-info'
                                >{`>40`}</button>
                            </div>
                        </div>
                    </div>
                </FilterWrapper>
                <div className='container' style={{ width: '80%' }}>
                    <div className='row row-cols-2 p-1 '>
                        {data &&
                            data.map((item) => (
                                <TeacherCard data={item} key={item.id} />
                            ))}
                    </div>
                </div>
                <div className='container p-5'>
                    <div className='row justify-content-center'>
                        <Pagination
                            class='col-md-auto'
                            count={Math.ceil(total / limit)}
                            shape='rounded'
                            size='large'
                            onChange={(e, value) => setPage(value)}
                        />
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default Dashboard;
