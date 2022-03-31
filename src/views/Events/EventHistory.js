import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { getAllMyEventsList } from "./EventsActions";


const EventHistory = () => {

    const dispatch = useDispatch();
    const store = useSelector((state) => state.events);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [isLoading, setLoading] = useState(true);

    useEffect(async () => {
        showLoader();
        await dispatch(getAllMyEventsList({type:'history'}));
        setLoading(false);
        hideLoader();
    }, []);

    const columns = [
        {
            title: "Title",
            field: "title",
        },
        {
            title: "Topic",
            field: "topic",
        },
        {
            title: "Mode",
            field: "mode",
        },
        {
            title: "Price(₹)",
            field: "price",
        },
        {
            title: "Target Audience",
            field: "target_audience",
        },
        {
            title: "Speaker",
            field: "speaker_name",
        },
    ];

    return (
        <>
            <div className="mt-3 p-2 mb-3">
                <div className="p-3">
                    <MaterialTable
                        title=""
                        columns={columns}
                        data={store.allEventsList}
                        options={{
                            search: true,
                            selection: false,
                            filtering: true,
                            searchFieldAlignment: "right",
                            headerStyle: {
                                backgroundColor: "#DEDDF4",
                                color: "#444346",
                                fontWeight: "600",
                                fontSize: "15px"
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default EventHistory;