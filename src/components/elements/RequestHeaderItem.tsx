import { ConfigProvider, Table } from "antd"

interface RequestHeaderItemProps {
    headerDataSource: []
}

const headerColums = [
    {
        title: "Header Parameter",
        dataIndex: "title",
        key: "title"
    },
    {
        title: "Value",
        dataIndex: "value",
        key: "value"
    }
];

const RequestHeaderItem: React.FC<RequestHeaderItemProps> = (props:RequestHeaderItemProps) => {

    return (
        <>
            <p className="text-[#202020] text-sm font-semibold">Request Header</p>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: "inheritance",
                            headerColor: "#202020",
                            headerSplitColor: "inheritance",
                            cellPaddingInline: 0
                        }
                    }
                }}
            >
                <Table
                    dataSource={props.headerDataSource}
                    columns={headerColums}
                    pagination={false}
                />
            </ConfigProvider>
        </>
    )
}

export default RequestHeaderItem;