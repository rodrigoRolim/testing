import SignUpPage from './SignUpPage.vue';
import { render, screen } from '@testing-library/vue';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it('has Sign Up Header', () => {
      render(SignUpPage);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });
    it("has username input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("username");
      expect(input).toBeInTheDocument();
    });
    it("has email input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("E-mail");
      expect(input).toBeInTheDocument();
    });
    it("has password input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("password");
      expect(input).toBeInTheDocument();
    });
    it("has password type for password input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("password");
      expect(input.type).toBe("password");
    });
    it("has password repeat input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("password repeat");
      expect(input).toBeInTheDocument();
    });
    it("has password type for password repeat input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("password repeat");
      expect(input.type).toBe("password");
    });
    it("has Sign Up Button", () => {
      render(SignUpPage);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });
    it("disables the button initially", () => {
      render(SignUpPage);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    })
  });
  describe("Interactions", () => {
    const setup = async () => {
      render(SignUpPage);
      const usernameInput = screen.queryByLabelText("username");
      const emailInput = screen.queryByLabelText("E-mail");
      const passwordInput = screen.queryByLabelText("password");
      const passwordRepeatInput = screen.queryByLabelText("password repeat");

      await userEvent.type(usernameInput, "user");
      await userEvent.type(emailInput, "user@email.com");
      await userEvent.type(passwordInput, "P4ssword");
      await userEvent.type(passwordRepeatInput, "P4ssword");
    }

    it("enables the button when the password and password repeat filleds have same values", 
      async () => {
        await setup();
        const button = screen.queryByRole("button", { name: "Sign Up" });
        expect(button).toBeEnabled();
    });
    it("sends login data to backend after submit them", async () => {
      let requestBody;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200));
        })
      );
      server.listen();

      await setup();

      const button = screen.queryByRole("button", { name: "Sign Up" });

      
     /*  const mockFn = jest.fn();
      // axios.post = mockFn;
      window.fetch = mockFn; */

      await userEvent.click(button);
      
      await server.close();

     /*  const firstCall = mockFn.mock.calls[0];
      const body = JSON.parse(firstCall[1].body); */

      expect(requestBody).toEqual({
        username: "user",
        email: "user@email.com",
        password: "P4ssword",
        passwordRepeat: "P4ssword"
      });
    });
    it("does not allow clicking to the button ehen there is an ongoing api call", async () => {
      let counter = 0;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          counter += 1;
          return res(ctx.status(200));
        })
      );
      server.listen();

      await setup();
      

      const button = screen.queryByRole("button", { name: "Sign Up" });


      await userEvent.click(button);
      
      await userEvent.click(button);


      await server.close();

      expect(counter).toBe(1);
    });
  });
})