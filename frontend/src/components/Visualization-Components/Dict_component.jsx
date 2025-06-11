
const DictComponent = (props) => {
    const dict = props.input;
    const result = dict;

    return (
        <div>
            <p style={{ marginBottom: "10px", fontSize: "18px" }}>dict</p>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "5px", border: "1px solid #aaa" }}>KEY</th>
                        <th style={{ padding: "5px", border: "1px solid #aaa" }}>VALUE</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(result).map(([key, value], index) => (
                        <tr key={index}>
                            <td style={{ padding: "5px", border: "1px solid #aaa" }}>{key}</td>
                            <td style={{ padding: "5px", border: "1px solid #aaa" }}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DictComponent;
