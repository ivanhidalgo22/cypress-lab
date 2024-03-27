import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { backendPort } from "../utils/portUtils";

export const publicTransactionsMachine = dataMachine("publicTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(`${process.env.VITE_BACKEND_ENDPOINT}/transactions/public`, {
        params: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data;
    },
  },
});
