import React from "react";

export function useNextData() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		setData((window as any).__NEXT_DATA__);
	}, []);

	return data;
}
