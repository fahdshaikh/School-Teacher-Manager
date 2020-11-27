import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    padding: 90px;
    overflow-x: hidden;
    font-family: sans-serif;
    div {
        // border: 1px solid red;
    }
`;

const Name = styled.div`
    font-size: 28px;
    font-weight: bold;
`;

const Heading = styled.div`
    font-size: 44px;
    font-weight: bold;
    padding-top: 20px;
    background: #e9ecef;
`;

const Classes = styled.div`
    border: 1px dashed darkgrey;
    background: #e9ecef;
    box-shadow: 0 4px 7px 0 rgba(218, 220, 230, 7.9);
    &:hover {
        transform: scale(1.02);
    }
`;

const Details = () => {
    let { name } = useParams();
    const [data, setData] = useState([]);
    const [classes, setClasses] = useState([]);
    console.log(name);
    name = name.split(' ');
    console.log(name);

    const getData = () => {
        axios
            .get(`http://localhost:5000/api/teacher/search/${name[0]}`)
            .then((res) => {
                console.log(res.data[0].classes);
                setData(res.data[0]);
                setClasses(res.data[0].classes);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Heading>Details of {name}</Heading>
            <Wrapper>
                <div className='container'>
                    <div className='row  justify-content-center'>
                        <div
                            className='col-2'
                            style={{
                                borderLeft: '10px solid darkgrey',
                                boxShadow:
                                    '0 4px 7px 0 rgba(218, 220, 230, 7.9)',
                                background: '#f8f9fa',
                            }}
                        >
                            <img
                                src={data.img_url}
                                alt='profile'
                                className='p-2'
                            />
                        </div>
                        <div
                            className='col-7'
                            style={{
                                boxShadow:
                                    '0 4px 7px 0 rgba(218, 220, 230, 7.9)',
                                background: '#f8f9fa',
                            }}
                        >
                            <div className='row-cols-1 text-left'>
                                <Name className='col'>
                                    Name: {data.first_name} {data.last_name}
                                </Name>
                                <div className='col'>
                                    Email: <b>{data.email}</b>
                                </div>
                                <div className='col'>
                                    Gender: <b>{data.gender}</b>
                                </div>
                                <div className='col'>
                                    Age: <b>{data.age}</b>
                                </div>
                                <div className='col'>
                                    <div className='row'>
                                        <div className='col-md-auto'>
                                            Classes Assigned:{' '}
                                        </div>
                                        <div className='col'>
                                            <div className='row'>
                                                {' '}
                                                {classes.map((item) => (
                                                    <Classes className='container mb-3 p-2'>
                                                        <div className='row'>
                                                            {' '}
                                                            <div className='col-3'>
                                                                Grade:{' '}
                                                                <b>
                                                                    {item.grade}
                                                                </b>{' '}
                                                            </div>
                                                            <div className='col-3'>
                                                                Section:{' '}
                                                                <b>
                                                                    {
                                                                        item.section
                                                                    }
                                                                </b>{' '}
                                                            </div>
                                                            <div className='col'>
                                                                Subject:{' '}
                                                                <b>
                                                                    {' '}
                                                                    {
                                                                        item.subject
                                                                    }
                                                                </b>
                                                            </div>
                                                            <div class='w-100'></div>
                                                        </div>
                                                    </Classes>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='w-100'></div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default Details;
