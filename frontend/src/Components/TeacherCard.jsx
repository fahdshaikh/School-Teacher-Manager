import React from 'react';
// import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    border: 1px solid darkgrey;
    // max-width: 50%;
    background: #fff;
    // border: 1px solid red;
    div {
        // border: 1px solid red;
    }
    button {
        border-radius: 0px;
        box-shadow: 0 4px 7px 0 rgba(218, 220, 230, 7.9);
    }
    box-shadow: 0 4px 7px 0 rgba(218, 220, 230, 7.9);
    &:hover {
        transform: scale(1.05);
    }
`;

const TeacherCard = (props) => {
    // const history = useHistory();
    const { data } = props;
    // console.log(data);

    return (
        <div className='col-6'>
            <Wrapper className='my-3'>
                <div className='row '>
                    <div className='col-md-auto pl-4 pr-0 pt-2 pb-2'>
                        <img src={data.img_url} alt='profile' />
                    </div>
                    <div className='col pt-3'>
                        <div className='row-cols-1'>
                            <div className='col text-capitalize text-left pl-0'>
                                <h5 className='font-weight-bold'>
                                    {data.first_name} {data.last_name}
                                </h5>
                            </div>
                            {/* <div className='col mb-0 text-left pl-0 text-capitalize'>
                            Gender: {data.gender} || Age: {data.age}
                        </div>
                        <div className='col mb-0 text-left pl-0 text-capitalize'>
                            Email: {data.email}
                        </div> */}
                            <div className='col mb-4 text-left pl-0 text-capitalize'>
                                Classes Assigned: <b>{data.classes.length}</b>
                            </div>
                            <div className='col text-capitalize text-right pl-0 mr-3 pb-2'>
                                <Link
                                    to={{
                                        pathname: `/teacher/${data.first_name} ${data.last_name}`,
                                    }}
                                    type='button'
                                    class='btn btn-info'
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default TeacherCard;
