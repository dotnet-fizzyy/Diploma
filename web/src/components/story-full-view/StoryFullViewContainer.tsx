import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const StoryFullViewContainer = () => {
    const params: any = useParams();

    useEffect(() => {
        console.warn(params);
    }, [params]);

    return <div>qwe</div>;
};

export default StoryFullViewContainer;
