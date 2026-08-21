/**
 * The session flag that stops the brand intro replaying.
 *
 * In its own module, with no `"use client"`, because both sides need the actual
 * string: `IntroCurtain` writes it in the browser, and the root layout inlines
 * it into a pre-paint `<script>` on the server. It used to be exported from
 * `IntroCurtain.tsx` itself, and a server component importing a plain constant
 * out of a client module gets a client *reference* rather than the value — so
 * the layout was emitting `sessionStorage.getItem(undefined)` and the guard had
 * never once fired. Returning visitors caught a frame of curtain every time.
 *
 * Nothing here may gain a React import or a directive; the moment this file
 * becomes a client module the same bug comes back.
 */
export const INTRO_SESSION_KEY = "handle:intro-played";
