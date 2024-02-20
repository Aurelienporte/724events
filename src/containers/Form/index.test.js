import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await waitFor(()=> screen.findByTestId("button-test-id"),{ timeout: 2000 }),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await waitFor(()=> screen.findByText("En cours"),{ timeout: 2000 }) ;
      await waitFor(() => screen.findByText("Envoyer"),{ timeout: 2000 }) ;
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
