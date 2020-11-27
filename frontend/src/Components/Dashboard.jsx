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
    let [gender, setGender] = useState('');
    let [search, setSearch] = useState('');

    // useEffect(() => {
    //     getData();
    // }, [data]);

    const getData = () => {
        console.log(search);
        let url = 'http://localhost:5000/api/teacher';

        axios
            .get(url, {
                params: {
                    page: page,
                    limit: limit,
                    gender: gender,
                    search: search,
                },
            })
            .then((res) => {
                setData(res.data.current);
                setTotal(res.data.total);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData();
    }, [page, limit, gender]);
    // }, []);
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
                                <button
                                    className='col-2 p-2 btn'
                                    style={{ backgroundColor: '#e9ecef' }}
                                    onClick={() => {
                                        setGender('');
                                        getData();
                                    }}
                                >
                                    <b> Search</b>
                                </button>
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
                                        onChange={(e) => {
                                            setSearch(e.target.value);
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
                                    onClick={() => {
                                        setPage(1);
                                        setGender('Male');
                                    }}
                                >
                                    Male
                                </button>
                                <button
                                    type='button'
                                    className='btn col mr-2 btn-sm btn-info'
                                    onClick={() => {
                                        setPage(1);
                                        setGender('Female');
                                    }}
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
